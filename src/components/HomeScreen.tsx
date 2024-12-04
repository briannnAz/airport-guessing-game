import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const HomeScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 animate-fade-in">
      <div className="max-w-2xl w-full space-y-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
          Airport Guessr: Knowledge of the Skies
        </h1>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">How to Play</h2>
          
          <ul className="text-left space-y-3 text-gray-600">
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

        <Button 
          onClick={() => navigate("/game")} 
          className="mt-8 px-8 py-6 text-lg"
        >
          Start Game
        </Button>
      </div>
    </div>
  );
};

export default HomeScreen;