
import React, { useEffect, useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { Plane } from 'lucide-react';

interface ProgressBarProps {
  currentQuestion: number;
  totalQuestions: number;
}

const ProgressBar = ({ currentQuestion, totalQuestions }: ProgressBarProps) => {
  const [planePosition, setPlanePosition] = useState(0);
  const [progressValue, setProgressValue] = useState(0);

  useEffect(() => {
    // First move the plane
    const newPlanePosition = ((currentQuestion - 1) / totalQuestions) * 100;
    setPlanePosition(newPlanePosition);
    
    // Then after a delay, move the progress bar to match
    const timer = setTimeout(() => {
      setProgressValue(newPlanePosition);
    }, 500); // Half-second delay for progress bar to follow plane
    
    return () => clearTimeout(timer);
  }, [currentQuestion, totalQuestions]);

  return (
    <div className="w-full max-w-3xl mb-4">
      <div className="relative">
        <Progress value={progressValue} className="w-full h-3" />
        <div 
          className="absolute top-1/2 -translate-y-1/2 transition-all duration-500"
          style={{ left: `${planePosition}%` }}
        >
          <Plane className="rotate-45" size={24} />
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
