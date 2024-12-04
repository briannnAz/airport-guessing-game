import React from 'react';

interface AnswerOptionsProps {
  options: string[];
  onAnswer: (city: string) => void;
  answered: boolean;
  selectedAnswer: string | null;
  correctAnswer: string;
  disabledOptions?: string[];
}

const AnswerOptions = ({
  options,
  onAnswer,
  answered,
  selectedAnswer,
  correctAnswer,
  disabledOptions = [],
}: AnswerOptionsProps) => {
  return (
    <div className="flex flex-col space-y-4">
      {options.map((code, index) => {
        const isDisabled = disabledOptions.includes(code);
        return (
          <button
            key={index}
            onClick={() => onAnswer(code)}
            disabled={answered || isDisabled}
            className={`
              p-4 rounded-lg text-center transition-all duration-200 w-full
              ${answered
                ? code === correctAnswer
                  ? 'bg-green-500 text-white'
                  : code === selectedAnswer
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-200 text-gray-500'
                : isDisabled
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-white hover:bg-gray-50 active:bg-gray-100'
              }
              ${!answered && !isDisabled && 'hover:scale-105'}
            `}
          >
            {code}
          </button>
        );
      })}
    </div>
  );
};

export default AnswerOptions;