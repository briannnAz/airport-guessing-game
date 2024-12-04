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
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="nyt-container">
        <div className="bg-gray-50 p-8 text-center space-y-8">
          <div className="border-b border-gray-300 pb-6">
            <h1 className="nyt-heading mb-2">Game Complete</h1>
            <p className="text-gray-500">Here's how you did</p>
          </div>
          
          <div className="font-serif text-6xl font-bold mb-8">
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
            className="nyt-button w-full max-w-xs mx-auto"
          >
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;