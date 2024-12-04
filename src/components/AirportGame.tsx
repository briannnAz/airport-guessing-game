import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import AnswerOptions from './game/AnswerOptions';
import QuestionHeader from './game/QuestionHeader';
import { fetchWikipediaData, airportData } from '../services/wikipediaService';
import { Lightbulb } from 'lucide-react';
import { Progress } from './ui/progress';
import confetti from 'canvas-confetti';

interface Airport {
  code: string;
  city: string;
  image: string;
  province: string;
  country: string;
  continent: string;
  name: string;
}

interface GameState {
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

const TOTAL_QUESTIONS = 10;
const PROGRESS_DURATION = 5000; // 5 seconds

const AirportGame = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [gameState, setGameState] = useState<GameState>({
    currentQuestion: 1,
    score: 0,
    answered: false,
    selectedAnswer: null,
    correctAnswer: '',
    options: [],
    currentAirport: null,
    hintUsed: false,
    usedCities: new Set(),
  });

  const getRandomOptions = (correctCode: string) => {
    const otherCodes = airportData
      .map(airport => airport.code)
      .filter(code => code !== correctCode);
    const shuffled = otherCodes.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 4);
    const allOptions = [...selected, correctCode];
    return allOptions.sort(() => 0.5 - Math.random());
  };

  const fetchAirportData = async () => {
    try {
      setLoading(true);
      let randomAirport;
      let attempts = 0;
      const maxAttempts = 10;

      do {
        const randomIndex = Math.floor(Math.random() * airportData.length);
        randomAirport = airportData[randomIndex];
        attempts++;
      } while (
        gameState.usedCities.has(randomAirport.wiki) && 
        attempts < maxAttempts
      );

      if (attempts >= maxAttempts) {
        toast({
          title: "Error",
          description: "Unable to find a unique city. Please try again.",
          variant: "destructive",
        });
        return;
      }

      const airport = await fetchWikipediaData(randomAirport.wiki);
      const options = getRandomOptions(airport.code);

      setGameState(prev => ({
        ...prev,
        currentAirport: airport,
        options: options,
        correctAnswer: airport.code,
        answered: false,
        selectedAnswer: null,
        hintUsed: false,
        usedCities: new Set([...prev.usedCities, randomAirport.wiki]),
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

  useEffect(() => {
    if (gameState.answered) {
      let startTime = Date.now();
      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const newProgress = Math.min((elapsed / PROGRESS_DURATION) * 100, 100);
        setProgress(newProgress);

        if (newProgress >= 100) {
          clearInterval(interval);
          if (gameState.currentQuestion === TOTAL_QUESTIONS) {
            if (gameState.score >= 7) {
              confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0 }
              });
            }
            navigate('/results', { 
              state: { 
                score: gameState.score,
                total: TOTAL_QUESTIONS
              } 
            });
          } else {
            setGameState(prev => ({
              ...prev,
              currentQuestion: prev.currentQuestion + 1,
            }));
            setProgress(0);
          }
        }
      }, 50);

      return () => clearInterval(interval);
    }
  }, [gameState.answered]);

  const handleHint = () => {
    if (gameState.hintUsed || gameState.answered) return;

    const incorrectOptions = gameState.options.filter(code => code !== gameState.correctAnswer);
    const randomIncorrectOption = incorrectOptions[Math.floor(Math.random() * incorrectOptions.length)];
    const newOptions = gameState.options.filter(code => code !== randomIncorrectOption);

    setGameState(prev => ({
      ...prev,
      options: newOptions,
      hintUsed: true,
    }));

    toast({
      title: "Hint Used",
      description: "One incorrect option has been removed.",
    });
  };

  const handleAnswer = (selectedCode: string) => {
    if (gameState.answered) return;

    const isCorrect = selectedCode === gameState.correctAnswer;
    setGameState(prev => ({
      ...prev,
      answered: true,
      selectedAnswer: selectedCode,
      score: isCorrect ? prev.score + 1 : prev.score,
    }));

    const airportName = gameState.currentAirport?.name || '';
    const truncatedName = airportName.length > 30 ? airportName.substring(0, 30) + '...' : airportName;

    toast({
      title: isCorrect ? "Correct!" : "Incorrect",
      description: isCorrect 
        ? `Well done! ${selectedCode} is the correct airport code for ${gameState.currentAirport?.city} (${truncatedName})`
        : `The correct answer was ${gameState.correctAnswer} (${gameState.currentAirport?.city} - ${truncatedName})`,
      variant: isCorrect ? "default" : "destructive",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-2xl font-light">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 animate-fade-in">
      <div className="w-full max-w-3xl">
        {gameState.answered && (
          <div className="mb-8">
            <Progress value={progress} className="w-full h-2" />
          </div>
        )}

        <QuestionHeader 
          currentQuestion={gameState.currentQuestion}
          totalQuestions={TOTAL_QUESTIONS}
          city={gameState.currentAirport?.city || ''}
        />

        <div className="bg-white/50 backdrop-blur-lg rounded-2xl p-8 shadow-lg mb-8">
          <div className="flex items-center justify-center mb-8">
            <h2 className="text-2xl font-bold">{gameState.currentAirport?.city}</h2>
            <button
              onClick={handleHint}
              disabled={gameState.hintUsed || gameState.answered}
              className={`ml-3 transition-all duration-300 ${gameState.hintUsed ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'} ${!gameState.hintUsed && !gameState.answered ? 'animate-pulse' : ''}`}
            >
              <Lightbulb className={`w-6 h-6 ${gameState.hintUsed ? 'text-gray-400' : 'text-yellow-500'}`} />
            </button>
          </div>

          <AnswerOptions
            options={gameState.options}
            onAnswer={handleAnswer}
            answered={gameState.answered}
            selectedAnswer={gameState.selectedAnswer}
            correctAnswer={gameState.correctAnswer}
          />
        </div>
      </div>
    </div>
  );
};

export default AirportGame;