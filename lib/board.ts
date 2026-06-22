import type { Category, Clue, GameData, QuestionBank } from "./types";

/** The five dollar tiers every board column contains. */
export const TIERS = [200, 400, 600, 800, 1000] as const;

/** Small deterministic PRNG so a given seed always rebuilds the same board. */
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** A fresh random seed for a new game/board. */
export function randomSeed(): number {
  return Math.floor(Math.random() * 0x7fffffff);
}

/** Fisher-Yates shuffle using the provided RNG (does not mutate input). */
function shuffle<T>(arr: T[], rng: () => number): T[] {
  const out = arr.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/**
 * Build one playable board from the bank for the given seed: for each category
 * it picks one clue per dollar tier, and picks one Final Jeopardy. Deterministic
 * in `seed`, so the same seed reproduces the same board (used for persistence),
 * and a new seed reshuffles everything.
 *
 * `categoryNames` selects which six bank categories to use (themed boards). If
 * omitted, six categories are sampled at random from the whole bank.
 */
export function generateBoard(
  bank: QuestionBank,
  seed: number,
  categoryNames?: string[],
): GameData {
  const rng = mulberry32(seed);
  const pick = <T>(arr: T[]): T => arr[Math.floor(rng() * arr.length)];

  let sourceCategories: Category[];
  if (categoryNames && categoryNames.length) {
    sourceCategories = categoryNames
      .map((name) => bank.categories.find((c) => c.name === name))
      .filter((c): c is Category => Boolean(c));
  } else {
    // Random mix: sample up to six categories from the whole bank.
    sourceCategories = shuffle(bank.categories, rng).slice(0, 6);
  }
  if (sourceCategories.length === 0) sourceCategories = bank.categories;

  const categories: Category[] = sourceCategories.map((cat) => {
    const byTier = new Map<number, Clue[]>();
    for (const clue of cat.clues) {
      const list = byTier.get(clue.value);
      if (list) list.push(clue);
      else byTier.set(clue.value, [clue]);
    }
    const clues: Clue[] = TIERS.map((value) => {
      const pool = byTier.get(value);
      return pool && pool.length ? pick(pool) : pick(cat.clues);
    });
    return { name: cat.name, image: cat.image, clues };
  });

  const finalJeopardy = bank.finals.length ? pick(bank.finals) : undefined;
  return { categories, finalJeopardy };
}
