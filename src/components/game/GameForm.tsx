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
        className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900 text-lg transition-all duration-300"
        maxLength={3}
        disabled={answered}
      />
      
      {!answered && (
        <div className="flex gap-4">
          <button
            type="submit"
            className="apple-button w-full"
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