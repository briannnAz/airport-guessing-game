import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { saveGameScore } from '@/utils/gameHistory';
import GameStats from './GameStats';

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, total, mode = 'normal' } = location.state || { score: 0, total: 10 };

  // Save the score when the component mounts
  React.useEffect(() => {
    saveGameScore(score, total, mode);
  }, [score, total, mode]);

  const handlePlayAgain = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#fbfbfd] flex items-center justify-center p-6">
      <div className="apple-container max-w-2xl">
        <div className="bg-white rounded-2xl p-12 shadow-sm space-y-10 text-center">
          <div className="space-y-4">
            <h1 className="apple-heading text-4xl md:text-5xl mb-2">Game Complete</h1>
            <p className="text-xl text-gray-500 font-light">Here's how you did</p>
          </div>
          
          <div className="font-semibold text-7xl md:text-8xl text-gray-900 py-8">
            {score}/{total}
          </div>
          
          <div className="text-xl text-gray-600 font-light">
            <p>
              {score === total 
                ? "Perfect score! You're an airport expert!" 
                : score >= total / 2 
                ? "Good job! Keep practicing to improve your score."
                : "Practice makes perfect! Try again to improve your score."}
            </p>
          </div>

          <div className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-semibold mb-6">Your Stats</h2>
            <GameStats mode={mode} singleDay={true} />
          </div>

          <button
            onClick={handlePlayAgain}
            className="apple-button mt-8"
          >
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;