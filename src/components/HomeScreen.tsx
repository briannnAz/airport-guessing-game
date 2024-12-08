import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GameStats from "./GameStats";
import Instructions from "./Instructions";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

const HomeScreen = () => {
  const navigate = useNavigate();
  const [statsOpen, setStatsOpen] = useState(false);
  const [instructionsOpen, setInstructionsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#fbfbfd]">
      <div className="apple-container py-16 md:py-24">
        <div className="space-y-12 text-center">
          <div className="space-y-4">
            <h1 className="apple-heading">Code Craze</h1>
            <p className="apple-subheading">
              Test your knowledge of international airports.
            </p>
          </div>

          <div className="flex flex-col space-y-4 max-w-md mx-auto pt-8">
            <button onClick={() => navigate("/game")} className="apple-button">
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
            <Dialog open={instructionsOpen} onOpenChange={setInstructionsOpen}>
              <DialogTrigger asChild>
                <button className="apple-button bg-secondary text-secondary-foreground hover:bg-secondary/90">
                  Instructions
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <Instructions />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
