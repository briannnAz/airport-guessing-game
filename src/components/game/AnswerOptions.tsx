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
    <div className="flex flex-col space-y-3">
      {options.map((code, index) => {
        const isDisabled = disabledOptions.includes(code);
        return (
          <button
            key={index}
            onClick={() => onAnswer(code)}
            disabled={answered || isDisabled}
            className={`
              px-6 py-4 rounded-xl text-center transition-all duration-300 text-lg
              ${answered
                ? code === correctAnswer
                  ? 'bg-green-500 text-white'
                  : code === selectedAnswer
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-100 text-gray-400'
                : isDisabled
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white hover:bg-gray-50 active:bg-gray-100 border border-gray-200'
              }
              ${!answered && !isDisabled && 'hover:scale-[1.02] shadow-sm'}
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