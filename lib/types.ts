/** A citation for the fact behind a clue, so every answer can be verified. */
export interface SourceRef {
  /** Short human-readable label, e.g. "JAF — Traffic Rules". */
  label: string;
  /** URL to the authoritative page. */
  url: string;
}

export interface Clue {
  value: number;
  clue: string;
  response: string;
  note?: string;
  source?: SourceRef;
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
  source?: SourceRef;
}

export interface GameData {
  categories: Category[];
  finalJeopardy?: FinalJeopardy;
}
