import React from 'react';

interface HardModeHeaderProps {
  city: string;
}

const HardModeHeader = ({ city }: HardModeHeaderProps) => {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="game-container">
        <div className="game-header">
          <button className="text-gray-400 hover:text-gray-600">
            <span className="sr-only">Close</span>
            ×
          </button>
          <div className="flex gap-2">
            <button className="px-4 py-1 rounded-full bg-primary text-white">EASY</button>
            <button className="px-4 py-1 rounded-full bg-gray-200">HARD</button>
          </div>
          <button className="text-gray-400 hover:text-gray-600">
            <span className="sr-only">Help</span>
            ?
          </button>
        </div>
        <div className="text-center mb-8">
          <div className="game-progress">2/10</div>
          <h2 className="game-title">{city}</h2>
        </div>
      </div>
    </div>
  );
};

export default HardModeHeader;