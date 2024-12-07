import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GameStats from "./GameStats";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

const HomeScreen = () => {
  const navigate = useNavigate();
  const [statsOpen, setStatsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#fbfbfd]">
      <div className="apple-container py-16 md:py-24">
        <div className="space-y-12 text-center">
          <div className="space-y-4">
            <h1 className="apple-heading">
              Airport Guessr
            </h1>
            <p className="apple-subheading">
              Test your knowledge of international airports.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm space-y-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">How to Play</h2>
            
            <ul className="text-left space-y-6 text-gray-600">
              <li className="flex items-start">
                <span className="mr-3 text-lg">•</span>
                <span className="text-lg">Match city names with their corresponding airport codes</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-lg">•</span>
                <span className="text-lg">Choose from multiple possible airport codes</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-lg">•</span>
                <span className="text-lg">Use hints to help identify the correct airport</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-lg">•</span>
                <span className="text-lg">Get instant feedback on your answers</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-lg">•</span>
                <span className="text-lg">Complete all rounds to test your knowledge</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col space-y-4 max-w-md mx-auto pt-8">
            <button 
              onClick={() => navigate("/game")} 
              className="apple-button"
            >
              Start Normal Mode
            </button>
            
            <button 
              onClick={() => navigate("/hard-game")} 
              className="apple-button bg-red-600 hover:bg-red-700"
            >
              Start Hard Mode
            </button>

            <Dialog open={statsOpen} onOpenChange={setStatsOpen}>
              <DialogTrigger asChild>
                <button className="apple-button bg-secondary text-secondary-foreground hover:bg-secondary/90">
                  View Game Stats
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <GameStats />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;