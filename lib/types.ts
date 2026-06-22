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

/**
 * The pool of all clues. Each category's `clues` holds MANY clues across the
 * dollar tiers; a board is generated per game by sampling one clue per tier
 * (see lib/board.ts), so every game is different. `finals` is the Final
 * Jeopardy pool.
 */
export interface QuestionBank {
  categories: Category[];
  finals: FinalJeopardy[];
}

/**
 * A selectable themed board. `categoryNames` lists the six bank categories the
 * board uses (in column order); omit it for a "random mix" that samples
 * categories from the whole bank.
 */
export interface BoardTheme {
  id: string;
  name: string;
  description?: string;
  categoryNames?: string[];
}

