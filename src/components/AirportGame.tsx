
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useGameLogic } from './game/GameLogic';
import { useAirportData } from '@/hooks/use-airport-data';
import confetti from 'canvas-confetti';
import QuestionHeader from './game/QuestionHeader';
import QuestionCard from './game/QuestionCard';
import ProgressBar from './game/ProgressBar';
import Header from './Header';

const TOTAL_QUESTIONS = 10;

const AirportGame = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { gameState, updateGameState } = useGameLogic();
  
  const { loading, disabledOptions, handleHint } = useAirportData({
    currentQuestion: gameState.currentQuestion,
    updateGameState,
    gameState
  });

  const handleNextQuestion = () => {
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
      updateGameState({
        currentQuestion: gameState.currentQuestion + 1,
      });
    }
  };

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

  const handleEndGame = () => {
    updateGameState({
      currentQuestion: 1,
      score: 0,
      usedCities: new Set(),
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
    <>
      <Header onHomeClick={handleEndGame} />
      <div className="min-h-screen flex flex-col items-center justify-center p-4 animate-fade-in">
        <div className="w-full max-w-3xl mt-16">
          <QuestionHeader 
            currentQuestion={gameState.currentQuestion}
            totalQuestions={TOTAL_QUESTIONS}
            city={gameState.currentAirport?.city || ''}
          />

          <ProgressBar 
            currentQuestion={gameState.currentQuestion}
            totalQuestions={TOTAL_QUESTIONS}
          />

          <QuestionCard
            city={gameState.currentAirport?.city || ''}
            options={gameState.options}
            onAnswer={handleAnswer}
            answered={gameState.answered}
            selectedAnswer={gameState.selectedAnswer}
            correctAnswer={gameState.correctAnswer}
            disabledOptions={disabledOptions}
            handleHint={handleHint}
            hintUsed={gameState.hintUsed}
            onNextQuestion={handleNextQuestion}
            isLastQuestion={gameState.currentQuestion === TOTAL_QUESTIONS}
          />
        </div>
      </div>
    </>
  );
};

export default AirportGame;
