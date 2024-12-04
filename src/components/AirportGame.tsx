import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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

// Sample airport codes and their corresponding Wikipedia page titles
const airportData = [
  { code: 'JFK', wiki: 'John_F._Kennedy_International_Airport' },
  { code: 'LHR', wiki: 'Heathrow_Airport' },
  { code: 'CDG', wiki: 'Charles_de_Gaulle_Airport' },
  { code: 'DXB', wiki: 'Dubai_International_Airport' },
  { code: 'HND', wiki: 'Haneda_Airport' },
  { code: 'SIN', wiki: 'Singapore_Changi_Airport' },
  { code: 'LAX', wiki: 'Los_Angeles_International_Airport' },
  { code: 'AMS', wiki: 'Amsterdam_Airport_Schiphol' },
];

const cityOptions = [
  'New York', 'London', 'Paris', 'Dubai',
  'Tokyo', 'Singapore', 'Los Angeles', 'Amsterdam',
  'Frankfurt', 'Hong Kong', 'Seoul', 'Sydney'
];

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

  const fetchWikipediaData = async (pageTitle: string) => {
    try {
      // First, fetch the page content and extract location info
      const contentUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro=1&titles=${pageTitle}&origin=*`;
      const contentResponse = await fetch(contentUrl);
      const contentData = await contentResponse.json();
      const pageId = Object.keys(contentData.query.pages)[0];
      const extract = contentData.query.pages[pageId].extract;

      // Then, fetch the page image
      const imageUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&titles=${pageTitle}&pithumbsize=1000&origin=*`;
      const imageResponse = await fetch(imageUrl);
      const imageData = await imageResponse.json();
      const image = imageData.query.pages[pageId].thumbnail?.source || 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05';

      // Get the corresponding airport data
      const airport = airportData.find(a => a.wiki === pageTitle);
      const cityMapping: { [key: string]: string } = {
        'John_F._Kennedy_International_Airport': 'New York',
        'Heathrow_Airport': 'London',
        'Charles_de_Gaulle_Airport': 'Paris',
        'Dubai_International_Airport': 'Dubai',
        'Haneda_Airport': 'Tokyo',
        'Singapore_Changi_Airport': 'Singapore',
        'Los_Angeles_International_Airport': 'Los Angeles',
        'Amsterdam_Airport_Schiphol': 'Amsterdam',
      };

      return {
        code: airport?.code || '',
        city: cityMapping[pageTitle] || '',
        image: image,
        province: 'Various',
        country: 'Various',
        continent: 'Various',
      };
    } catch (error) {
      console.error('Error fetching Wikipedia data:', error);
      throw error;
    }
  };

  const getRandomOptions = (correctCity: string) => {
    const otherCities = cityOptions.filter(city => city !== correctCity);
    const shuffled = otherCities.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);
    const allOptions = [...selected, correctCity];
    return allOptions.sort(() => 0.5 - Math.random());
  };

  const fetchAirportData = async () => {
    try {
      setLoading(true);
      // Get a random airport from our predefined list
      const randomAirport = airportData[Math.floor(Math.random() * airportData.length)];
      const airport = await fetchWikipediaData(randomAirport.wiki);
      
      const options = getRandomOptions(airport.city);

      setGameState(prev => ({
        ...prev,
        currentAirport: airport,
        options: options,
        correctAnswer: airport.city,
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

  const handleAnswer = (selectedCity: string) => {
    if (gameState.answered) return;

    const isCorrect = selectedCity === gameState.correctAnswer;
    setGameState(prev => ({
      ...prev,
      answered: true,
      selectedAnswer: selectedCity,
      score: isCorrect ? prev.score + 1 : prev.score,
    }));

    toast({
      title: isCorrect ? "Correct!" : "Incorrect",
      description: isCorrect 
        ? "Well done! That's the right airport."
        : `The correct answer was ${gameState.correctAnswer}.`,
      variant: isCorrect ? "default" : "destructive",
    });
  };

  const handleNext = () => {
    if (gameState.currentQuestion === 5) {
      navigate('/results', { 
        state: { 
          score: gameState.score,
          total: 5
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
        <div className="text-sm font-light mb-8 text-center">
          Question {gameState.currentQuestion} of 5
        </div>

        <div className="bg-white/50 backdrop-blur-lg rounded-2xl p-8 shadow-lg mb-8">
          <div className="relative mb-6">
            {gameState.currentAirport?.image && (
              <img
                src={gameState.currentAirport.image}
                alt="Airport"
                className="w-full h-64 object-cover rounded-lg"
                style={{ opacity: gameState.answered ? 0.7 : 1 }}
              />
            )}
            {gameState.answered && (
              <div className="absolute inset-0 flex items-center justify-center">
                {gameState.selectedAnswer === gameState.correctAnswer ? (
                  <Check className="w-16 h-16 text-green-500" />
                ) : (
                  <X className="w-16 h-16 text-red-500" />
                )}
              </div>
            )}
          </div>

          <div className="text-center mb-8">
            <div className="text-4xl font-bold mb-2">{gameState.currentAirport?.code}</div>
            <div className="text-sm text-gray-500">Guess the city of this airport</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {gameState.options.map((city, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(city)}
                disabled={gameState.answered}
                className={`
                  p-4 rounded-lg text-center transition-all duration-200
                  ${gameState.answered
                    ? city === gameState.correctAnswer
                      ? 'bg-green-500 text-white'
                      : city === gameState.selectedAnswer
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-100 text-gray-500'
                    : 'bg-white hover:bg-gray-50 active:bg-gray-100'
                  }
                  ${!gameState.answered && 'hover:scale-105'}
                `}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {gameState.answered && (
          <button
            onClick={handleNext}
            className="w-full bg-black text-white py-4 rounded-lg hover:bg-gray-800 transition-colors duration-200"
          >
            {gameState.currentQuestion === 5 ? 'Finish' : 'Next Question'}
          </button>
        )}
      </div>
    </div>
  );
};

export default AirportGame;