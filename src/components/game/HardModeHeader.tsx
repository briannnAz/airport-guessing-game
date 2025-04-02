
import React from 'react';

interface HardModeHeaderProps {
  city: string;
}

const HardModeHeader = ({ city }: HardModeHeaderProps) => {
  return (
    <div className="w-full max-w-3xl mt-16">
      <div className="bg-white rounded-lg shadow-sm border border-ftusa-darkgray p-8 mb-8">
        <div className="text-center mb-4">
          <h2 className="text-3xl font-bold mb-2 text-ftusa-blue">{city}</h2>
          <p className="text-sm text-gray-500">Guess the airport code</p>
        </div>
      </div>
    </div>
  );
};

export default HardModeHeader;
