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
  /** Optional illustration filename in /public/illustrations (e.g. "helmet.png"). */
  image?: string;
}

export interface Category {
  name: string;
  clues: Clue[];
  /** Optional illustration filename in /public/illustrations for the header. */
  image?: string;
}

export interface FinalJeopardy {
  category: string;
  clue: string;
  response: string;
  note?: string;
  source?: SourceRef;
  image?: string;
}

export interface GameData {
  categories: Category[];
  finalJeopardy?: FinalJeopardy;
}
