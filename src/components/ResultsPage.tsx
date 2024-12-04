import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, total } = location.state || { score: 0, total: 5 };

  const handlePlayAgain = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 animate-fade-in">
      <div className="max-w-md w-full">
        <div className="bg-white/50 backdrop-blur-lg rounded-2xl p-8 shadow-lg text-center">
          <h1 className="text-4xl font-bold mb-2">Game Complete!</h1>
          <p className="text-gray-500 mb-8">Here's how you did</p>
          
          <div className="text-6xl font-bold mb-8">
            {score}/{total}
          </div>
          
          <div className="mb-8">
            <p className="text-gray-600">
              {score === total 
                ? "Perfect score! You're an airport expert!" 
                : score >= total / 2 
                ? "Good job! Keep practicing to improve your score."
                : "Practice makes perfect! Try again to improve your score."}
            </p>
          </div>

          <button
            onClick={handlePlayAgain}
            className="w-full bg-black text-white py-4 rounded-lg hover:bg-gray-800 transition-colors duration-200"
          >
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;