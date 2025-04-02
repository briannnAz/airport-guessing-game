
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { getRandomAirport, getRandomAirportCodes } from '@/services/airportService';

interface UseAirportDataProps {
  currentQuestion: number;
  updateGameState: (updates: any) => void;
  gameState: any;
}

export const useAirportData = ({ currentQuestion, updateGameState, gameState }: UseAirportDataProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [disabledOptions, setDisabledOptions] = useState<string[]>([]);

  const resetDisabledOptions = () => {
    setDisabledOptions([]);
  };

  const handleHint = () => {
    if (gameState.hintUsed || gameState.answered) return;

    const incorrectOptions = gameState.options.filter(code => code !== gameState.correctAnswer);
    const randomIncorrectOption = incorrectOptions[Math.floor(Math.random() * incorrectOptions.length)];
    
    setDisabledOptions([randomIncorrectOption]);
    updateGameState({
      hintUsed: true,
    });

    toast({
      title: "Hint Used",
      description: "One incorrect option has been disabled.",
    });
  };

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
      
      resetDisabledOptions();
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
  }, [currentQuestion]);

  return {
    loading,
    disabledOptions,
    handleHint
  };
};
