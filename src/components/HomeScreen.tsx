
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GameStats from "./GameStats";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

const HomeScreen = () => {
  const navigate = useNavigate();
  const [statsOpen, setStatsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-ftusa-lightblue">
      <div className="ftusa-container py-16 md:py-24">
        <div className="space-y-10 text-center">
          <div className="space-y-4">
            <h1 className="ftusa-heading">
              Airport Guessr
            </h1>
            <p className="ftusa-subheading">
              Test your knowledge of international airports.
            </p>
          </div>
          
          <div className="ftusa-card space-y-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-ftusa-blue">How to Play</h2>
            
            <ul className="text-left space-y-5 text-gray-600">
              <li className="flex items-start">
                <span className="mr-3 text-ftusa-red font-bold">•</span>
                <span>Match city names with their corresponding airport codes</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-ftusa-red font-bold">•</span>
                <span>Choose from multiple possible airport codes</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-ftusa-red font-bold">•</span>
                <span>Use hints to help identify the correct airport</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-ftusa-red font-bold">•</span>
                <span>Get instant feedback on your answers</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-ftusa-red font-bold">•</span>
                <span>Complete all rounds to test your knowledge</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col space-y-4 max-w-md mx-auto pt-6">
            <button 
              onClick={() => navigate("/game")} 
              className="ftusa-button"
            >
              Start Normal Mode
            </button>
            
            <button 
              onClick={() => navigate("/hard-game")} 
              className="ftusa-secondary-button"
            >
              Start Hard Mode
            </button>

            <Dialog open={statsOpen} onOpenChange={setStatsOpen}>
              <DialogTrigger asChild>
                <button className="bg-ftusa-darkgray text-ftusa-blue hover:bg-gray-300 px-4 py-3 rounded font-medium transition-all">
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
