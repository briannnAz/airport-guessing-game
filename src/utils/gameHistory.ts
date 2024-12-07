import { addDays, isSameDay, parseISO, startOfDay } from "date-fns";

export interface GameScore {
  date: string;
  score: number;
  total: number;
  mode: 'normal' | 'hard';
}

export const saveGameScore = (score: number, total: number, mode: 'normal' | 'hard') => {
  const history = getGameHistory();
  const today = new Date().toISOString();
  
  // Only save if it's the best score for the day
  const todayScore = history.find(h => 
    h.mode === mode && 
    isSameDay(parseISO(h.date), parseISO(today))
  );
  
  if (!todayScore || (todayScore && (score / total) > (todayScore.score / todayScore.total))) {
    const newHistory = history.filter(h => 
      !(h.mode === mode && isSameDay(parseISO(h.date), parseISO(today)))
    );
    newHistory.push({ date: today, score, total, mode });
    localStorage.setItem('gameHistory', JSON.stringify(newHistory));
  }
};

export const getGameHistory = (): GameScore[] => {
  const history = localStorage.getItem('gameHistory');
  return history ? JSON.parse(history) : [];
};

export const getStreak = (mode: 'normal' | 'hard'): number => {
  const history = getGameHistory();
  const modeHistory = history.filter(h => h.mode === mode);
  if (modeHistory.length === 0) return 0;

  let streak = 0;
  let currentDate = startOfDay(new Date());
  
  while (true) {
    const hasGameForDay = modeHistory.some(h => 
      isSameDay(parseISO(h.date), currentDate)
    );
    
    if (!hasGameForDay) break;
    
    streak++;
    currentDate = addDays(currentDate, -1);
  }
  
  return streak;
};

export const getAverageScore = (mode: 'normal' | 'hard'): number => {
  const history = getGameHistory().filter(h => h.mode === mode);
  if (history.length === 0) return 0;
  
  const totalPercentage = history.reduce((acc, curr) => 
    acc + ((curr.score / curr.total) * 100), 0
  );
  
  return Number((totalPercentage / history.length).toFixed(1));
};