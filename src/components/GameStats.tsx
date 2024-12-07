import React from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getGameHistory, getStreak, getAverageScore, GameScore } from '@/utils/gameHistory';
import { format, parseISO } from 'date-fns';

interface GameStatsProps {
  mode?: 'normal' | 'hard';
  singleDay?: boolean;
}

const GameStats = ({ mode, singleDay = false }: GameStatsProps) => {
  const history = getGameHistory();
  const today = new Date();

  const getScoreForDay = (date: Date, gameMode: 'normal' | 'hard') => {
    return history.find(h => 
      h.mode === gameMode && 
      format(parseISO(h.date), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );
  };

  const modifierStyles = {
    hasScore: "bg-primary text-primary-foreground rounded-md",
  };

  const renderStats = (gameMode: 'normal' | 'hard') => {
    const streak = getStreak(gameMode);
    const average = getAverageScore(gameMode);
    const modeHistory = history.filter(h => h.mode === gameMode);
    
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-secondary p-4 rounded-lg text-center">
            <div className="text-2xl font-bold">{streak}</div>
            <div className="text-sm text-muted-foreground">Day Streak</div>
          </div>
          <div className="bg-secondary p-4 rounded-lg text-center">
            <div className="text-2xl font-bold">{average}%</div>
            <div className="text-sm text-muted-foreground">Average Score</div>
          </div>
        </div>

        <Calendar
          mode="single"
          selected={today}
          modifiers={{
            hasScore: (date) => !!getScoreForDay(date, gameMode),
          }}
          modifiersStyles={modifierStyles}
          className="rounded-md border"
        />

        {singleDay && modeHistory.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Today's Best Score</h3>
            <div className="text-3xl font-bold text-center">
              {modeHistory[modeHistory.length - 1].score}/{modeHistory[modeHistory.length - 1].total}
            </div>
          </div>
        )}
      </div>
    );
  };

  if (singleDay) {
    return (
      <div className="p-6">
        {renderStats(mode || 'normal')}
      </div>
    );
  }

  return (
    <Tabs defaultValue="normal" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="normal">Normal Mode</TabsTrigger>
        <TabsTrigger value="hard">Hard Mode</TabsTrigger>
      </TabsList>
      <TabsContent value="normal" className="mt-6">
        {renderStats('normal')}
      </TabsContent>
      <TabsContent value="hard" className="mt-6">
        {renderStats('hard')}
      </TabsContent>
    </Tabs>
  );
};

export default GameStats;