import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import AirportImage from './game/AirportImage';
import AnswerOptions from './game/AnswerOptions';
import QuestionHeader from './game/QuestionHeader';
import NextButton from './game/NextButton';
import { fetchWikipediaData, airportData, cityOptions } from '../services/wikipediaService';

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
  });

  const getRandomOptions = (correctCode: string) => {
    const otherCodes = airportData
      .map(airport => airport.code)
      .filter(code => code !== correctCode);
    const shuffled = otherCodes.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);
    const allOptions = [...selected, correctCode];
    return allOptions.sort(() => 0.5 - Math.random());
  };

  const fetchAirportData = async () => {
    try {
      setLoading(true);
      const randomAirport = airportData[Math.floor(Math.random() * airportData.length)];
      const airport = await fetchWikipediaData(randomAirport.wiki);
      const options = getRandomOptions(airport.code);

      setGameState(prev => ({
        ...prev,
        currentAirport: airport,
        options: options,
        correctAnswer: airport.code,
        answered: false,
        selectedAnswer: null,
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
          <AirportImage
            image={gameState.currentAirport?.image || ''}
            answered={gameState.answered}
            isCorrect={gameState.selectedAnswer === gameState.correctAnswer}
          />

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