import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiRefreshCw } from 'react-icons/fi'; 
const TranscriptionsPage = () => {
  const [transcriptions, setTranscriptions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedTranscriptions = JSON.parse(localStorage.getItem('transcriptions')) || [];
    setTranscriptions(savedTranscriptions);
  }, []);

  const handleRefresh = () => {
    localStorage.removeItem('transcriptions'); 
    setTranscriptions([]); 
    const refreshIcon = document.querySelector('.refresh-icon');
    refreshIcon.classList.add('animate-spin');
    setTimeout(() => {
      refreshIcon.classList.remove('animate-spin');
    }, 1000); 
  };

  return (
    <div className="p-8 min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex justify-center items-center">
      <div className="w-full max-w-3xl mx-auto bg-white shadow-2xl rounded-lg overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-extrabold mb-2">Past Transcriptions</h2>
            <p className="text-lg opacity-75">Review your recent transcriptions below:</p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate(-1)} 
              className="bg-white text-blue-500 font-semibold py-2 px-4 rounded-lg shadow hover:bg-gray-100 transition"
            >
              Back
            </button>
            <button
              onClick={handleRefresh} 
              className="bg-white text-blue-500 font-semibold py-2 px-4 rounded-lg shadow hover:bg-gray-100 transition"
            >
              <FiRefreshCw size={24} className="refresh-icon" />
            </button>
          </div>
        </div>
        <div className="p-6 bg-white">
          {transcriptions.length > 0 ? (
            <ul className="space-y-4">
              {transcriptions.map((item, index) => (
                <li key={index} className="p-4 bg-gray-50 border-l-4 border-blue-500 rounded-lg shadow-md hover:bg-gray-100 transition">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-semibold">{item.date}</span>
                    <span className="text-gray-600 italic">{item.transcript}</span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-center mt-8">No transcriptions yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TranscriptionsPage;
