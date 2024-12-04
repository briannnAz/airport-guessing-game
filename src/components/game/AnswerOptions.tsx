import React from 'react';

interface AnswerOptionsProps {
  options: string[];
  onAnswer: (city: string) => void;
  answered: boolean;
  selectedAnswer: string | null;
  correctAnswer: string;
}

const AnswerOptions = ({
  options,
  onAnswer,
  answered,
  selectedAnswer,
  correctAnswer,
}: AnswerOptionsProps) => {
  const getOrderedOptions = () => {
    if (!answered) return options;
    
    return [...options].sort((a, b) => {
      if (a === correctAnswer) return -1;
      if (b === correctAnswer) return 1;
      if (a === selectedAnswer) return -1;
      if (b === selectedAnswer) return 1;
      return 0;
    });
  };

  return (
    <div className="flex flex-col space-y-4">
      {getOrderedOptions().map((code, index) => (
        <button
          key={index}
          onClick={() => onAnswer(code)}
          disabled={answered}
          className={`
            p-4 rounded-lg text-center transition-all duration-200 w-full
            ${answered
              ? code === correctAnswer
                ? 'bg-green-500 text-white'
                : code === selectedAnswer
                ? 'bg-red-500 text-white'
                : 'bg-gray-200 text-gray-500'
              : 'bg-white hover:bg-gray-50 active:bg-gray-100'
            }
            ${!answered && 'hover:scale-105'}
          `}
        >
          {code}
        </button>
      ))}
    </div>
  );
};

export default AnswerOptions;