import React from 'react';

interface HardModeHeaderProps {
  city: string;
}

const HardModeHeader = ({ city }: HardModeHeaderProps) => {
  return (
    <div className="w-full max-w-3xl mt-16">
      <div className="bg-white/50 backdrop-blur-lg rounded-2xl p-8 shadow-lg mb-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-2">{city}</h2>
          <p className="text-sm text-gray-500">Guess the airport code</p>
        </div>
      </div>
    </div>
  );
};

export default HardModeHeader;