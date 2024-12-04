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
}: AnswerOptionsProps) => (
  <div className="grid grid-cols-2 gap-4">
    {options.map((city, index) => (
      <button
        key={index}
        onClick={() => onAnswer(city)}
        disabled={answered}
        className={`
          p-4 rounded-lg text-center transition-all duration-200
          ${answered
            ? city === correctAnswer
              ? 'bg-green-500 text-white'
              : city === selectedAnswer
              ? 'bg-red-500 text-white'
              : 'bg-gray-100 text-gray-500'
            : 'bg-white hover:bg-gray-50 active:bg-gray-100'
          }
          ${!answered && 'hover:scale-105'}
        `}
      >
        {city}
      </button>
    ))}
  </div>
);

export default AnswerOptions;