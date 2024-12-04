import React from 'react';

interface NextButtonProps {
  onClick: () => void;
  isLastQuestion: boolean;
}

const NextButton = ({ onClick, isLastQuestion }: NextButtonProps) => (
  <button
    onClick={onClick}
    className="w-full bg-black text-white py-4 rounded-lg hover:bg-gray-800 transition-colors duration-200"
  >
    {isLastQuestion ? 'Finish' : 'Next Question'}
  </button>
);

export default NextButton;