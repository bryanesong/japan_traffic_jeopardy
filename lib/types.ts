export interface Clue {
  value: number;
  clue: string;
  response: string;
  note?: string;
  revealed?: boolean;
}

export interface Category {
  name: string;
  clues: Clue[];
}

export interface FinalJeopardy {
  category: string;
  clue: string;
  response: string;
  note?: string;
}

export interface GameData {
  categories: Category[];
  finalJeopardy?: FinalJeopardy;
}
