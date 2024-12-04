import { useState } from 'react';
import { Airport } from '@/services/airportService';

export interface GameState {
  currentQuestion: number;
  score: number;
  answered: boolean;
  selectedAnswer: string | null;
  correctAnswer: string;
  options: string[];
  currentAirport: Airport | null;
  hintUsed: boolean;
  usedCities: Set<string>;
}

export const initialGameState: GameState = {
  currentQuestion: 1,
  score: 0,
  answered: false,
  selectedAnswer: null,
  correctAnswer: '',
  options: [],
  currentAirport: null,
  hintUsed: false,
  usedCities: new Set(),
};

export const useGameLogic = () => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  
  const updateGameState = (updates: Partial<GameState>) => {
    setGameState(prev => ({
      ...prev,
      ...updates,
    }));
  };

  return {
    gameState,
    updateGameState,
  };
};