import React from 'react';

interface QuestionHeaderProps {
  currentQuestion: number;
  airportCode: string;
}

const QuestionHeader = ({ currentQuestion, airportCode }: QuestionHeaderProps) => (
  <>
    <div className="text-sm font-light mb-8 text-center">
      Question {currentQuestion} of 5
    </div>
    <div className="text-center mb-8">
      <div className="text-4xl font-bold mb-2">{airportCode}</div>
      <div className="text-sm text-gray-500">Guess the city of this airport</div>
    </div>
  </>
);

export default QuestionHeader;