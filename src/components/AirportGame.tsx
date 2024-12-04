import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import AnswerOptions from './game/AnswerOptions';
import QuestionHeader from './game/QuestionHeader';
import { getRandomAirport, getRandomAirportCodes } from '../services/airportService';
import { Lightbulb } from 'lucide-react';
import { Progress } from './ui/progress';
import confetti from 'canvas-confetti';
import { useGameLogic } from './game/GameLogic';

const TOTAL_QUESTIONS = 10;
const PROGRESS_DURATION = 5000;

const AirportGame = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [disabledOptions, setDisabledOptions] = useState<string[]>([]);
  const { gameState, updateGameState } = useGameLogic();

  const fetchAirportData = async () => {
    try {
      setLoading(true);
      const airport = await getRandomAirport();
      
      if (gameState.usedCities.has(airport.wiki_url)) {
        await fetchAirportData();
        return;
      }

      const wrongOptions = await getRandomAirportCodes(airport.iata_code);
      const allOptions = [...wrongOptions, airport.iata_code].sort(() => 0.5 - Math.random());

      updateGameState({
        currentAirport: airport,
        options: allOptions,
        correctAnswer: airport.iata_code,
        answered: false,
        selectedAnswer: null,
        hintUsed: false,
        usedCities: new Set([...gameState.usedCities, airport.wiki_url]),
      });
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
    
    setDisabledOptions([randomIncorrectOption]);
    setGameState(prev => ({
      ...prev,
      hintUsed: true,
    }));

    toast({
      title: "Hint Used",
      description: "One incorrect option has been disabled.",
    });
  };

  useEffect(() => {
    if (!gameState.answered) {
      setDisabledOptions([]);
    }
  }, [gameState.currentQuestion]);

  const handleAnswer = (selectedCode: string) => {
    if (gameState.answered) return;

    const isCorrect = selectedCode === gameState.correctAnswer;
    updateGameState({
      answered: true,
      selectedAnswer: selectedCode,
      score: isCorrect ? gameState.score + 1 : gameState.score,
    });

    const airportName = gameState.currentAirport?.name || '';
    const truncatedName = airportName.length > 30 ? airportName.substring(0, 30) + '...' : airportName;

    toast({
      title: isCorrect ? "Correct!" : "Incorrect",
      description: isCorrect 
        ? `Well done! ${selectedCode} is the correct airport code for ${gameState.currentAirport?.city}`
        : `The correct answer was ${gameState.correctAnswer} (${gameState.currentAirport?.city})`,
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
            disabledOptions={disabledOptions}
          />
        </div>
      </div>
    </div>
  );
};

export default AirportGame;
