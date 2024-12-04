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
              You will be shown an airport code and an image of the airport
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              Choose the correct city from four options
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              Get immediate feedback on your answers
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              Complete 5 rounds to test your airport knowledge
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              See your final score at the end
            </li>
          </ul>
        </div>

        <button 
          onClick={() => navigate("/game")} 
          className="nyt-button w-full max-w-xs mx-auto"
        >
          Start Game
        </button>
      </div>
    </div>
  );
};

export default HomeScreen;