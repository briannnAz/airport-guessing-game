import React from 'react';
import { Check, X } from 'lucide-react';

interface AirportImageProps {
  image: string;
  answered: boolean;
  isCorrect: boolean;
}

const AirportImage = ({ image, answered, isCorrect }: AirportImageProps) => (
  <div className="relative mb-6">
    <img
      src={image}
      alt="Airport"
      className="w-full h-64 object-cover rounded-lg"
      style={{ opacity: answered ? 0.7 : 1 }}
    />
    {answered && (
      <div className="absolute inset-0 flex items-center justify-center">
        {isCorrect ? (
          <Check className="w-16 h-16 text-green-500" />
        ) : (
          <X className="w-16 h-16 text-red-500" />
        )}
      </div>
    )}
  </div>
);

export default AirportImage;