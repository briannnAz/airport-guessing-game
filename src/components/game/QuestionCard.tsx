
import React from 'react';
import { Lightbulb } from 'lucide-react';
import AnswerOptions from './AnswerOptions';
import NextButton from './NextButton';

interface QuestionCardProps {
  city: string;
  options: string[];
  onAnswer: (selectedCode: string) => void;
  answered: boolean;
  selectedAnswer: string | null;
  correctAnswer: string;
  disabledOptions: string[];
  handleHint: () => void;
  hintUsed: boolean;
  onNextQuestion: () => void;
  isLastQuestion: boolean;
}

const QuestionCard = ({
  city,
  options,
  onAnswer,
  answered,
  selectedAnswer,
  correctAnswer,
  disabledOptions,
  handleHint,
  hintUsed,
  onNextQuestion,
  isLastQuestion
}: QuestionCardProps) => {
  return (
    <div className="bg-white/50 backdrop-blur-lg rounded-2xl p-8 shadow-lg mb-8">
      <div className="flex items-center justify-center mb-8">
        <h2 className="text-2xl font-bold">{city}</h2>
        <button
          onClick={handleHint}
          disabled={hintUsed || answered}
          className={`ml-3 transition-all duration-300 ${hintUsed ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'} ${!hintUsed && !answered ? 'animate-pulse' : ''}`}
        >
          <Lightbulb className={`w-6 h-6 ${hintUsed ? 'text-gray-400' : 'text-yellow-500'}`} />
        </button>
      </div>

      <AnswerOptions
        options={options}
        onAnswer={onAnswer}
        answered={answered}
        selectedAnswer={selectedAnswer}
        correctAnswer={correctAnswer}
        disabledOptions={disabledOptions}
      />

      {answered && (
        <div className="mt-6">
          <NextButton 
            onClick={onNextQuestion} 
            isLastQuestion={isLastQuestion} 
          />
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
