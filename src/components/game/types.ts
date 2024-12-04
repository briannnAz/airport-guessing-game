export interface GameState {
  currentQuestion: number;
  totalScore: number;
  currentAirport: any;
  answered: boolean;
  hintsUsed: number;
  attempts: number;
  wrongAnswers: string[];
  hints: string[];
}

export interface Hint {
  type: string;
  text: string | ((airport: any) => string);
}