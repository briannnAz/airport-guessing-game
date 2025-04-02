
import React from 'react';

interface NextButtonProps {
  onClick: () => void;
  isLastQuestion: boolean;
}

const NextButton = ({ onClick, isLastQuestion }: NextButtonProps) => (
  <button
    onClick={onClick}
    className="w-full bg-ftusa-blue text-white py-4 rounded hover:bg-blue-900 transition-colors duration-200 animate-fade-in"
  >
    {isLastQuestion ? 'See Your Results' : 'Next Question'}
  </button>
);

export default NextButton;
