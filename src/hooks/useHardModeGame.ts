import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { getRandomAirport } from '@/services/airportService';
import confetti from 'canvas-confetti';
import { GameState, Hint } from '../components/game/types';

const TOTAL_QUESTIONS = 10;
const MAX_POINTS_PER_QUESTION = 5;
const MAX_ATTEMPTS = 5;

export const useHardModeGame = () => {
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
      
      // Move to next question after correct answer
      setTimeout(handleNextQuestion, 1500);
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
          description: "You've used all your attempts. Moving to next question.",
          variant: "destructive",
        });
        
        setTimeout(handleNextQuestion, 1500);
      }
    }
    
    setUserInput('');
  };

  return {
    loading,
    userInput,
    setUserInput,
    gameState,
    handleSubmit,
    handleNextQuestion,
  };
};