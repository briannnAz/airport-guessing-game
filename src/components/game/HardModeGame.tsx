import React, { useEffect } from 'react';
import { Plane } from 'lucide-react';
import { Progress } from '../ui/progress';
import GameForm from './GameForm';
import { useHardModeGame } from '@/hooks/useHardModeGame';

const TOTAL_QUESTIONS = 10;

const HardModeGame = () => {
  const {
    loading,
    userInput,
    setUserInput,
    gameState,
    handleSubmit,
    handleNextQuestion,
  } = useHardModeGame();

  useEffect(() => {
    // This effect will trigger the initial fetch
    handleNextQuestion();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-2xl font-light">Loading...</div>
      </div>
    );
  }

  const progressPercentage = ((gameState.currentQuestion - 1) / TOTAL_QUESTIONS) * 100;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 animate-fade-in">
      <div className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm z-50 p-4 shadow-md">
        <div className="w-full max-w-3xl mx-auto">
          <div className="relative">
            <Progress value={progressPercentage} className="w-full h-3" />
            <Plane 
              className="absolute top-1/2 -translate-y-1/2 transition-all duration-500"
              style={{ left: `${progressPercentage}%` }}
              size={24}
            />
          </div>
        </div>
      </div>

      <div className="w-full max-w-3xl mt-16">
        <div className="text-sm font-light mb-8 text-center">
          Question {gameState.currentQuestion} of {TOTAL_QUESTIONS}
        </div>

        <div className="bg-white/50 backdrop-blur-lg rounded-2xl p-8 shadow-lg mb-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-2">{gameState.currentAirport?.city}</h2>
            <p className="text-sm text-gray-500">Guess the airport code</p>
          </div>

          <GameForm
            userInput={userInput}
            setUserInput={setUserInput}
            handleSubmit={handleSubmit}
            answered={gameState.answered}
            wrongAnswers={gameState.wrongAnswers}
            hints={gameState.hints}
            onNext={handleNextQuestion}
            isLastQuestion={gameState.currentQuestion === TOTAL_QUESTIONS}
          />
        </div>
      </div>
    </div>
  );
};

export default HardModeGame;