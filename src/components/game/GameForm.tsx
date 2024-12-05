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
        className={`w-full p-4 rounded-lg border-2 border-[#1B1F8C] focus:outline-none focus:ring-2 focus:ring-[#1B1F8C] text-lg transition-all duration-300 bg-white text-[#1B1F8C] placeholder:text-[#1B1F8C]/60 ${wrongAnswers.length > 0 && !answered ? 'animate-shake' : ''}`}
        maxLength={3}
        disabled={answered}
      />
      
      {!answered && (
        <div className="flex gap-4">
          <button
            type="submit"
            className="w-full bg-[#1B1F8C] text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:bg-[#2C3199] text-sm tracking-wide shadow-md hover:shadow-lg"
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