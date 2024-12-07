import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { saveGameScore } from '@/utils/gameHistory';
import GameStats from '../GameStats';

const HardModeResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, maxScore } = location.state || { score: 0, maxScore: 50 };
  const percentage = (score / maxScore) * 100;

  // Save the score when the component mounts
  React.useEffect(() => {
    saveGameScore(score, maxScore, 'hard');
  }, [score, maxScore]);

  const handlePlayAgain = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="apple-container max-w-2xl">
        <div className="bg-gray-50 p-8 text-center space-y-8">
          <div className="border-b border-gray-300 pb-6">
            <h1 className="apple-heading mb-2">Hard Mode Complete</h1>
            <p className="text-gray-500">Here's how you did</p>
          </div>
          
          <div className="font-serif text-6xl font-bold mb-8">
            {score}/{maxScore}
          </div>
          
          <div className="mb-8">
            <p className="text-gray-600">
              {percentage === 100 
                ? "Perfect score! You're an airport expert!" 
                : percentage >= 70 
                ? "Great job! Your airport knowledge is impressive!"
                : "Keep practicing to improve your score!"}
            </p>
          </div>

          <div className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-semibold mb-6">Your Stats</h2>
            <GameStats mode="hard" singleDay={true} />
          </div>

          <button
            onClick={handlePlayAgain}
            className="apple-button w-full max-w-xs mx-auto"
          >
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default HardModeResults;