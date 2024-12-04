import React from 'react';

interface WrongAnswersProps {
  answers: string[];
}

const WrongAnswers = ({ answers }: WrongAnswersProps) => {
  if (answers.length === 0) return null;

  return (
    <div className="mt-4 p-4 bg-red-50 rounded-lg">
      <h3 className="text-sm font-medium text-red-800 mb-2">Previous attempts:</h3>
      <div className="flex flex-wrap gap-2">
        {answers.map((answer, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-red-100 text-red-800 rounded text-sm"
          >
            {answer}
          </span>
        ))}
      </div>
    </div>
  );
};

export default WrongAnswers;