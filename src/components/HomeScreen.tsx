import React from "react";
import { useNavigate } from "react-router-dom";

const HomeScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="nyt-container space-y-8 text-center">
        <div className="border-b border-gray-300 pb-8 mb-8">
          <h1 className="nyt-heading mb-4">
            Airport Guessr
          </h1>
          <p className="nyt-subheading">
            Knowledge of the Skies
          </p>
        </div>
        
        <div className="bg-gray-50 p-8 space-y-6">
          <h2 className="font-serif text-2xl font-semibold text-gray-800">How to Play</h2>
          
          <ul className="text-left space-y-4 text-gray-600">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              You will be shown a city name and need to match it to its airport code
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              Choose from five possible airport codes
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              Use the lightbulb hint once per round to remove one incorrect answer
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              Get immediate feedback on your answers
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              Complete 10 rounds to test your airport knowledge
            </li>
          </ul>
        </div>

        <div className="flex flex-col space-y-4">
          <button 
            onClick={() => navigate("/game")} 
            className="nyt-button w-full max-w-xs mx-auto"
          >
            Start Normal Mode
          </button>
          
          <button 
            onClick={() => navigate("/hard-game")} 
            className="nyt-button w-full max-w-xs mx-auto bg-red-600 hover:bg-red-700"
          >
            Start Hard Mode
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;