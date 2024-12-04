import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import AnswerOptions from './game/AnswerOptions';
import QuestionHeader from './game/QuestionHeader';
import NextButton from './game/NextButton';
import { fetchWikipediaData, airportData } from '../services/wikipediaService';
import { Lightbulb } from 'lucide-react';

interface Airport {
  code: string;
  city: string;
  image: string;
  province: string;
  country: string;
  continent: string;
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
}

const TOTAL_QUESTIONS = 10;

const AirportGame = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [gameState, setGameState] = useState<GameState>({
    currentQuestion: 1,
    score: 0,
    answered: false,
    selectedAnswer: null,
    correctAnswer: '',
    options: [],
    currentAirport: null,
    hintUsed: false,
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
      const randomIndex = Math.floor(Math.random() * airportData.length);
      const randomAirport = airportData[randomIndex];
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

    toast({
      title: isCorrect ? "Correct!" : "Incorrect",
      description: isCorrect 
        ? `Well done! ${selectedCode} is the correct airport code for ${gameState.currentAirport?.city}.`
        : `The correct answer was ${gameState.correctAnswer} (${gameState.currentAirport?.city}).`,
      variant: isCorrect ? "default" : "destructive",
    });
  };

  const handleNext = () => {
    if (gameState.currentQuestion === TOTAL_QUESTIONS) {
      navigate('/results', { 
        state: { 
          score: gameState.score,
          total: TOTAL_QUESTIONS
        } 
      });
      return;
    }

    setGameState(prev => ({
      ...prev,
      currentQuestion: prev.currentQuestion + 1,
    }));
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

        {gameState.answered && (
          <NextButton
            onClick={handleNext}
            isLastQuestion={gameState.currentQuestion === TOTAL_QUESTIONS}
          />
        )}
      </div>
    </div>
  );
};

export default AirportGame;