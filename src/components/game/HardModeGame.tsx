import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { getRandomAirport } from '@/services/airportService';
import { Plane } from 'lucide-react';
import { Progress } from '../ui/progress';
import confetti from 'canvas-confetti';
import NextButton from './NextButton';

const TOTAL_QUESTIONS = 10;
const MAX_POINTS_PER_QUESTION = 5;

interface HardModeState {
  currentQuestion: number;
  totalScore: number;
  currentAirport: any;
  answered: boolean;
  hintsUsed: number;
  attempts: number;
}

const HardModeGame = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [userInput, setUserInput] = useState('');
  const [gameState, setGameState] = useState<HardModeState>({
    currentQuestion: 1,
    totalScore: 0,
    currentAirport: null,
    answered: false,
    hintsUsed: 0,
    attempts: 0,
  });

  const hints = [
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

  useEffect(() => {
    fetchAirportData();
  }, [gameState.currentQuestion]);

  const handleNextQuestion = () => {
    if (gameState.currentQuestion === TOTAL_QUESTIONS) {
      if (gameState.totalScore >= (TOTAL_QUESTIONS * MAX_POINTS_PER_QUESTION * 0.7)) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
      navigate('/hard-results', { 
        state: { 
          score: gameState.totalScore,
          maxScore: TOTAL_QUESTIONS * MAX_POINTS_PER_QUESTION
        } 
      });
    } else {
      setGameState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1,
      }));
      setUserInput('');
    }
  };

  const showHint = () => {
    if (gameState.hintsUsed >= hints.length) return;
    
    const currentHint = hints[gameState.hintsUsed];
    const hintText = typeof currentHint.text === 'function' 
      ? currentHint.text(gameState.currentAirport)
      : currentHint.text;

    toast({
      title: "Hint",
      description: hintText,
    });

    setGameState(prev => ({
      ...prev,
      hintsUsed: prev.hintsUsed + 1,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (gameState.answered) return;

    const isCorrect = userInput.toUpperCase() === gameState.currentAirport.iata_code;
    
    if (isCorrect) {
      const pointsEarned = Math.max(MAX_POINTS_PER_QUESTION - gameState.attempts, 1);
      setGameState(prev => ({
        ...prev,
        answered: true,
        totalScore: prev.totalScore + pointsEarned,
      }));

      toast({
        title: "Correct!",
        description: `You earned ${pointsEarned} points!`,
      });
    } else {
      setGameState(prev => ({
        ...prev,
        attempts: prev.attempts + 1,
      }));
      
      toast({
        title: "Incorrect",
        description: "Try again! Use a hint if needed.",
        variant: "destructive",
      });
      
      if (!gameState.hintsUsed) {
        showHint();
      }
    }
    
    setUserInput('');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-2xl font-light">Loading...</div>
      </div>
    );
  }

  const progressPercentage = ((gameState.currentQuestion - 1) / TOTAL_QUESTIONS) * 100;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 animate-fade-in">
      <div className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm z-50 p-4 shadow-md">
        <div className="w-full max-w-3xl mx-auto">
          <div className="relative">
            <Progress value={progressPercentage} className="w-full h-3" />
            <Plane 
              className="absolute top-1/2 -translate-y-1/2 transition-all duration-500"
              style={{ left: `${progressPercentage}%` }}
              size={24}
            />
          </div>
        </div>
      </div>

      <div className="w-full max-w-3xl mt-16">
        <div className="text-sm font-light mb-8 text-center">
          Question {gameState.currentQuestion} of {TOTAL_QUESTIONS}
        </div>

        <div className="bg-white/50 backdrop-blur-lg rounded-2xl p-8 shadow-lg mb-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-2">{gameState.currentAirport?.city}</h2>
            <p className="text-sm text-gray-500">Guess the airport code</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Enter airport code (e.g., LAX)"
              className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              maxLength={3}
              disabled={gameState.answered}
            />
            
            {!gameState.answered && (
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-black text-white py-4 rounded-lg hover:bg-gray-800 transition-colors duration-200"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={showHint}
                  disabled={gameState.hintsUsed >= hints.length}
                  className="px-6 py-4 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Hint
                </button>
              </div>
            )}
          </form>

          {gameState.answered && (
            <div className="mt-6">
              <NextButton 
                onClick={handleNextQuestion} 
                isLastQuestion={gameState.currentQuestion === TOTAL_QUESTIONS} 
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HardModeGame;