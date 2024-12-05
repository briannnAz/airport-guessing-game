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
        className={`game-input ${wrongAnswers.length > 0 && !answered ? 'animate-shake' : ''}`}
        maxLength={3}
        disabled={answered}
      />
      
      {!answered && (
        <div className="flex gap-4">
          <button
            type="submit"
            className="game-button bg-primary text-white hover:bg-primary/90"
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