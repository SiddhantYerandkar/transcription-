import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GiMicrophone, GiSoundWaves } from "react-icons/gi";
import { FaStop, FaArrowLeft } from "react-icons/fa";
import Plyr from 'plyr';

const AudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState('');
  const [transcription, setTranscription] = useState('');
  const mediaRecorderRef = useRef(null);
  const navigate = useNavigate();

  const audioRef = useRef(null);

  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        mediaRecorderRef.current = new MediaRecorder(stream, { mimeType: 'audio/webm' });
        mediaRecorderRef.current.start();
        setIsRecording(true);

        mediaRecorderRef.current.ondataavailable = event => {
          const audioBlob = new Blob([event.data], { type: 'audio/webm' });
          const url = URL.createObjectURL(audioBlob);
          setAudioUrl(url);

          transcribeAudio(audioBlob);
        };
      })
      .catch(error => {
        console.error('Error accessing audio stream:', error);
      });
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const transcribeAudio = async (audioBlob) => {
    const formData = new FormData();
    formData.append('file', audioBlob);
    const apiKey = process.env.REACT_APP_API_KEY;

    try {
      const response = await axios.post('https://api.deepgram.com/v1/listen', formData, {
        headers: {
          'Authorization': `Token ${apiKey}`,
          'Content-Type': 'audio/webm'
        }
      });

      console.log('Deepgram response:', response.data);

      const transcript = response.data.results.channels[0].alternatives[0].transcript;
      const date = new Date().toLocaleString();

      const savedTranscriptions = JSON.parse(localStorage.getItem('transcriptions')) || [];
      localStorage.setItem('transcriptions', JSON.stringify([...savedTranscriptions, { transcript, date }]));

      setTranscription(transcript);
    } catch (error) {
      console.error('Error transcribing audio:', error.response?.data || error.message);
    }
  };

  useEffect(() => {
    const player = new Plyr(audioRef.current, {
      controls: ['play', 'progress', 'current-time', 'mute', 'volume'],
      settings: ['speed', 'quality'],
      type: 'audio',
    });

    return () => {
      player.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white p-6 relative">
      <button
        className="flex items-center text-white bg-blue-600 rounded-full px-4 py-2 shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105 absolute top-4 left-4"
        onClick={() => navigate('/')}
      >
        <FaArrowLeft className="mr-2" /> Back to Homepage
      </button>

      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-2">Audio Recorder</h1>
        <p className="text-lg">Press the button to start recording and see the transcription in real-time.</p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center space-x-6">
        <div className="flex flex-col items-center">
          <button
            className={`flex items-center justify-center w-20 h-20 rounded-full ${isRecording ? 'bg-red-600' : 'bg-green-600'} shadow-lg hover:shadow-xl transition-shadow duration-300`}
            onClick={isRecording ? stopRecording : startRecording}
          >
            {isRecording ? <FaStop className="w-8 h-8" /> : <GiMicrophone className="w-10 h-10" />}
          </button>

          {isRecording && (
            <div className="mt-4 animate-pulse text-xl flex items-center">
              <GiSoundWaves className="mr-2 w-6 h-6" /> Recording...
            </div>
          )}
        </div>

        {!transcription ? (
          <div className="mt-12 md:mt-0 md:ml-20 w-full max-w-md bg-white bg-opacity-20 p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4 animate-pulse">Your transcription will be shown here</h2>
            <p className="text-lg">Start recording to see the magic!</p>
          </div>
        ) : (
          <div className="mt-12 md:mt-0 md:ml-20 w-full max-w-md bg-white bg-opacity-20 p-6 rounded-lg shadow-lg text-left">
            <h2 className="text-2xl font-bold mb-4">Transcription:</h2>
            <p className="text-lg">{transcription}</p>
          </div>
        )}

      </div>

      {audioUrl && (
        <div className="mt-12 w-full max-w-3xl flex justify-center">
          <audio
            ref={audioRef}
            className="rounded-lg shadow-lg border-4 border-transparent hover:border-gradient-to-r hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500 transition-all duration-500"
            controls
          >
            <source src={audioUrl} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}

      <div className="mt-8">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
          onClick={() => navigate('/transcriptions')}
        >
          View Past Transcriptions
        </button>
      </div>
    </div>
  );
};

export default AudioRecorder;
