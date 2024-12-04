import React from 'react';

interface QuestionHeaderProps {
  currentQuestion: number;
  totalQuestions: number;
  city: string;
}

const QuestionHeader = ({ currentQuestion, totalQuestions, city }: QuestionHeaderProps) => (
  <>
    <div className="text-sm font-light mb-8 text-center">
      Question {currentQuestion} of {totalQuestions}
    </div>
    <div className="text-center mb-8">
      <div className="text-4xl font-bold mb-2">{city}</div>
      <div className="text-sm text-gray-500">Match this city to its airport code</div>
    </div>
  </>
);

export default QuestionHeader;