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
              game-button
              ${answered
                ? code === correctAnswer
                  ? 'bg-green-500 text-white border-green-500'
                  : code === selectedAnswer
                  ? 'bg-red-500 text-white border-red-500'
                  : 'bg-gray-100 text-gray-400 border-gray-200'
                : ''}
              ${!answered && !isDisabled ? 'hover:scale-[1.02]' : ''}
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