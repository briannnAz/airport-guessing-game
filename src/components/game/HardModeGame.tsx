import React, { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { getRandomAirport } from '@/services/airportService';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { GameState, Hint } from './types';
import GameForm from './GameForm';
import HardModeHeader from './HardModeHeader';

const MAX_POINTS = 5;
const MAX_ATTEMPTS = 5;

const HardModeGame = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [userInput, setUserInput] = useState('');
  const [gameState, setGameState] = useState<GameState>({
    currentQuestion: 1,
    totalScore: 0,
    currentAirport: null,
    answered: false,
    hintsUsed: 0,
    attempts: 0,
    wrongAnswers: [],
    hints: [],
  });

  const hints: Hint[] = [
    { type: 'continent', text: 'Continent: North America' },
    { type: 'country', text: (airport: any) => `Country: ${airport.country}` },
    { type: 'province', text: 'Province/State: USA' },
    { type: 'code', text: (airport: any) => `First letter of code: ${airport.iata_code[0]}` },
  ];

  const fetchAirportData = async () => {
    try {
      setLoading(true);
      const airport = await getRandomAirport();
      setGameState(prev => ({
        ...prev,
        currentAirport: airport,
        hintsUsed: 0,
        attempts: 0,
        answered: false,
        wrongAnswers: [],
        hints: [],
      }));
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch airport data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGameEnd = (score: number) => {
    if (score >= (MAX_POINTS * 0.7)) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
    navigate('/hard-results', { 
      state: { 
        score: score,
        maxScore: MAX_POINTS
      } 
    });
  };

  const showHint = () => {
    if (gameState.hintsUsed >= hints.length) return;
    
    const currentHint = hints[gameState.hintsUsed];
    const hintText = typeof currentHint.text === 'function' 
      ? currentHint.text(gameState.currentAirport)
      : currentHint.text;

    setGameState(prev => ({
      ...prev,
      hintsUsed: prev.hintsUsed + 1,
      hints: [...prev.hints, hintText],
    }));

    toast({
      title: "Hint",
      description: hintText,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (gameState.answered) return;

    const isCorrect = userInput.toUpperCase() === gameState.currentAirport.iata_code;
    
    if (isCorrect) {
      const pointsEarned = Math.max(MAX_POINTS - gameState.attempts, 1);
      setGameState(prev => ({
        ...prev,
        answered: true,
        totalScore: prev.totalScore + pointsEarned,
      }));

      toast({
        title: "Correct!",
        description: `You earned ${pointsEarned} points!`,
      });
      
      setTimeout(() => handleGameEnd(pointsEarned), 1500);
    } else {
      const newAttempts = gameState.attempts + 1;
      const remainingAttempts = MAX_ATTEMPTS - newAttempts;
      
      setGameState(prev => ({
        ...prev,
        attempts: newAttempts,
        wrongAnswers: [...prev.wrongAnswers, userInput.toUpperCase()],
      }));
      
      if (remainingAttempts > 0) {
        toast({
          title: "Incorrect",
          description: `Try again! ${remainingAttempts} attempts remaining.`,
          variant: "destructive",
        });
        
        if (!gameState.hintsUsed) {
          showHint();
        }
      } else {
        toast({
          title: "Game Over",
          description: "You've used all your attempts.",
          variant: "destructive",
        });
        handleGameEnd(0); // Removed the delay here
      }
    }
    
    setUserInput('');
  };

  useEffect(() => {
    fetchAirportData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-2xl font-light">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 animate-fade-in">
      <HardModeHeader city={gameState.currentAirport?.city} />
      <div className="w-full max-w-3xl">
        <GameForm
          userInput={userInput}
          setUserInput={setUserInput}
          handleSubmit={handleSubmit}
          answered={gameState.answered}
          wrongAnswers={gameState.wrongAnswers}
          hints={gameState.hints}
          onNext={() => {}}
          isLastQuestion={true}
        />
      </div>
    </div>
  );
};

export default HardModeGame;