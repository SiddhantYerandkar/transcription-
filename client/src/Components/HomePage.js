import React from 'react';
import microphonelogo from '../Assets/microphone-electronics-logo.png';
import { useNavigate } from 'react-router-dom';
import { GiSoundWaves } from "react-icons/gi";

const Homepage = () => {
    const navigate = useNavigate(); 

    const handleStartClick = () => {
        navigate('/record'); 
    };
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white relative">
            <header className="w-full py-6 flex justify-between items-center border-b border-gray-300 px-6 bg-white bg-opacity-20 backdrop-blur-sm animate-fadeIn">
                <div className="text-3xl font-extrabold">Transcription</div>
            </header>
            
            <div className="absolute top-20 right-8 z-30">
                <img src={microphonelogo} alt="Microphone" className="h-40" style={{ transform: 'rotate(180deg)' }} />
            </div>

            <main className="flex-grow flex flex-col items-center justify-center text-center px-6 relative z-10">
                <div className="mb-8 relative">
                    <span className="text-6xl font-bold text-white drop-shadow-md animate-fadeIn z-20">
                        Convert Your Audio to Text Instantly
                    </span>
                </div>
                <div className="flex items-center justify-center space-x-6 mb-12 relative z-20">
                    <GiSoundWaves className="w-24 h-20 animate-pulse" />
                </div>
                <button 
                    className="mt-6 px-10 py-4 bg-blue-600 text-white text-2xl rounded-full shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105 animate-slideInUp z-20"
                    onClick={handleStartClick} 
                >
                    Start
                </button>
            </main>

            <footer className="w-full py-6 border-t border-gray-300 text-center text-base bg-white bg-opacity-20 backdrop-blur-sm animate-fadeIn">
                <p>&copy; 2024 AudioText - All Rights Reserved.</p>
            </footer>
        </div>
    );
};

export default Homepage;
