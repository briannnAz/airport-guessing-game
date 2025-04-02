
import React from 'react';
import WrongAnswers from './WrongAnswers';
import NextButton from './NextButton';
import HintsList from './HintsList';

interface GameFormProps {
  userInput: string;
  setUserInput: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  answered: boolean;
  wrongAnswers: string[];
  hints: string[];
  onNext: () => void;
  isLastQuestion: boolean;
}

const GameForm = ({
  userInput,
  setUserInput,
  handleSubmit,
  answered,
  wrongAnswers,
  hints,
  onNext,
  isLastQuestion,
}: GameFormProps) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <HintsList hints={hints} />
      
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Enter airport code (e.g., LAX)"
        className={`w-full p-4 rounded border-2 border-ftusa-blue focus:outline-none focus:ring-2 focus:ring-ftusa-blue text-lg transition-all duration-300 bg-white text-ftusa-blue placeholder:text-ftusa-blue/60 ${wrongAnswers.length > 0 && !answered ? 'animate-shake' : ''}`}
        maxLength={3}
        disabled={answered}
      />
      
      {!answered && (
        <div className="flex gap-4">
          <button
            type="submit"
            className="w-full ftusa-button"
          >
            Submit
          </button>
        </div>
      )}

      <WrongAnswers answers={wrongAnswers} />

      {answered && (
        <NextButton 
          onClick={onNext} 
          isLastQuestion={isLastQuestion} 
        />
      )}
    </form>
  );
};

export default GameForm;
