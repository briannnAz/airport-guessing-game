import React from 'react';

interface HintsListProps {
  hints: string[];
}

const HintsList = ({ hints }: HintsListProps) => {
  if (hints.length === 0) return null;

  return (
    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
      <h3 className="text-sm font-medium text-gray-800 mb-2">Hints:</h3>
      <div className="flex flex-wrap gap-2">
        {hints.map((hint, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-gray-200 text-gray-800 rounded text-sm"
          >
            {hint}
          </span>
        ))}
      </div>
    </div>
  );
};

export default HintsList;