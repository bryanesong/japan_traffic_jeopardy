"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Board from "@/components/Board";
import ClueModal from "@/components/ClueModal";
import Logo from "@/components/Logo";
import Illustration from "@/components/Illustration";
import Scoreboard, { type Team } from "@/components/Scoreboard";
import FinalJeopardy from "@/components/FinalJeopardy";
import { questionBank } from "@/lib/questionBank";
import { generateBoard, randomSeed } from "@/lib/board";
import { BOARDS, DEFAULT_BOARD_ID, boardById } from "@/lib/boards";

const STORAGE_KEY = "japan-traffic-jeopardy-state";
// Bump when the bank/board structure changes so old saved state is discarded.
const CONTENT_VERSION = 3;
// Deterministic seed used for the very first server render (avoids hydration
// mismatch); replaced with the stored or a random seed right after mount.
const INITIAL_SEED = 1;

interface ActiveClue {
  categoryIndex: number;
  clueIndex: number;
}

function cellKey(categoryIndex: number, clueIndex: number) {
  return `${categoryIndex}-${clueIndex}`;
}

function makeId() {
  return Math.random().toString(36).slice(2, 10);
}

export default function HomePage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [active, setActive] = useState<ActiveClue | null>(null);
  const [showResponse, setShowResponse] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  // The seed picks which clues fill the board; a new seed = a new board.
  const [seed, setSeed] = useState(INITIAL_SEED);
  // Which themed board (set of categories) is in play.
  const [themeId, setThemeId] = useState(DEFAULT_BOARD_ID);
  // Incremented whenever the board changes so the Final Jeopardy panel (which
  // holds its own open/revealed state) remounts fresh.
  const [gameId, setGameId] = useState(0);

  // Load persisted state once on mount.
  useEffect(() => {
    let restoredSeed: number | null = null;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as {
          version?: number;
          teams?: Team[];
          revealed?: Record<string, boolean>;
          seed?: number;
          themeId?: string;
        };
        if (Array.isArray(parsed.teams)) setTeams(parsed.teams);
        if (parsed.version === CONTENT_VERSION) {
          if (parsed.revealed && typeof parsed.revealed === "object") {
            setRevealed(parsed.revealed);
          }
          if (typeof parsed.seed === "number") restoredSeed = parsed.seed;
          if (typeof parsed.themeId === "string" && boardById(parsed.themeId)) {
            setThemeId(parsed.themeId);
          }
        }
      }
    } catch {
      // Ignore corrupt / unavailable storage.
    }
    // Keep the saved board if there was one, otherwise deal a fresh one.
    setSeed(restoredSeed ?? randomSeed());
    setHydrated(true);
  }, []);

  // Persist whenever teams, revealed cells, or the board seed change.
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          version: CONTENT_VERSION,
          teams,
          revealed,
          seed,
          themeId,
        }),
      );
    } catch {
      // Ignore storage write failures (e.g. private mode quotas).
    }
  }, [teams, revealed, seed, themeId, hydrated]);

  const board = useMemo(
    () => generateBoard(questionBank, seed, boardById(themeId).categoryNames),
    [seed, themeId],
  );

  const activeClue = useMemo(() => {
    if (!active) return null;
    return (
      board.categories[active.categoryIndex]?.clues[active.clueIndex] ?? null
    );
  }, [active, board]);

  const activeCategoryName = active
    ? board.categories[active.categoryIndex]?.name ?? ""
    : "";

  const handleSelect = useCallback((categoryIndex: number, clueIndex: number) => {
    setActive({ categoryIndex, clueIndex });
    setShowResponse(false);
  }, []);

  const handleClose = useCallback(() => {
    setActive((current) => {
      if (current) {
        setRevealed((prev) => ({
          ...prev,
          [cellKey(current.categoryIndex, current.clueIndex)]: true,
        }));
      }
      return null;
    });
    setShowResponse(false);
  }, []);

  const handleAddTeam = useCallback((name: string) => {
    setTeams((prev) => [...prev, { id: makeId(), name, score: 0 }]);
  }, []);

  const handleRemoveTeam = useCallback((id: string) => {
    setTeams((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const handleAdjustScore = useCallback((id: string, delta: number) => {
    setTeams((prev) =>
      prev.map((t) => (t.id === id ? { ...t, score: t.score + delta } : t)),
    );
  }, []);

  // Deal a brand-new random board, clearing the current board's progress.
  const dealNewBoard = useCallback(() => {
    setRevealed({});
    setActive(null);
    setShowResponse(false);
    setSeed(randomSeed());
    setGameId((id) => id + 1);
  }, []);

  const handleThemeChange = useCallback((id: string) => {
    setThemeId(id);
    setRevealed({});
    setActive(null);
    setShowResponse(false);
    setGameId((n) => n + 1);
  }, []);

  const handleNewBoard = useCallback(() => {
    const ok = window.confirm(
      "Shuffle in a fresh board? This clears the current board's revealed clues (team scores are kept).",
    );
    if (ok) dealNewBoard();
  }, [dealNewBoard]);

  const handleReset = useCallback(() => {
    const ok = window.confirm(
      "Start a new game? This deals a fresh board and resets every team's score to 0.",
    );
    if (!ok) return;
    dealNewBoard();
    setTeams((prev) => prev.map((t) => ({ ...t, score: 0 })));
  }, [dealNewBoard]);

  const totalClues = board.categories.reduce(
    (sum, c) => sum + c.clues.length,
    0,
  );
  const revealedCount = Object.values(revealed).filter(Boolean).length;

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:py-10">
      <header className="mb-6 text-center">
        <Logo className="mx-auto mb-4 h-24 w-auto sm:h-32" />
        <h1 className="sr-only">Japan Traffic Jeopardy</h1>
        <p className="mt-2 text-sm text-blue-200 sm:text-base">
          A party trivia game about Japanese traffic &amp; motorcycle laws.
        </p>
        <Illustration
          name="touring.png"
          className="mx-auto mt-4 h-24 w-auto object-contain sm:h-28"
        />
      </header>

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-blue-200/80">
          {revealedCount} / {totalClues} clues revealed
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <label className="flex items-center gap-2 text-sm font-bold uppercase text-jeopardy-value">
            Board
            <select
              value={themeId}
              onChange={(e) => handleThemeChange(e.target.value)}
              className="rounded-md border-2 border-jeopardy-value/70 bg-jeopardy-dark px-3 py-2 text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-jeopardy-value"
            >
              {BOARDS.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </label>
          <button
            type="button"
            onClick={handleNewBoard}
            className="rounded-md border-2 border-jeopardy-value/70 px-4 py-2 text-sm font-bold uppercase text-jeopardy-value transition hover:bg-jeopardy-value hover:text-jeopardy-dark"
          >
            🎲 New Board
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="rounded-md border-2 border-jeopardy-value px-4 py-2 text-sm font-bold uppercase text-jeopardy-value transition hover:bg-jeopardy-value hover:text-jeopardy-dark"
          >
            New Game / Reset
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(260px,1fr)]">
        <div className="space-y-6">
          <Board
            categories={board.categories}
            revealed={revealed}
            onSelect={handleSelect}
          />
          {board.finalJeopardy && (
            <FinalJeopardy key={gameId} final={board.finalJeopardy} />
          )}
        </div>

        <Scoreboard
          teams={teams}
          activeValue={activeClue?.value ?? 0}
          onAddTeam={handleAddTeam}
          onRemoveTeam={handleRemoveTeam}
          onAdjustScore={handleAdjustScore}
        />
      </div>

      <footer className="mt-10 border-t border-jeopardy-value/20 pt-4 text-center text-xs text-blue-200/70">
        For study &amp; fun — always verify current laws with official sources
        (JAF / Japan National Police Agency).
      </footer>

      {activeClue && active && (
        <ClueModal
          clue={activeClue}
          categoryName={activeCategoryName}
          showResponse={showResponse}
          teams={teams}
          onScore={handleAdjustScore}
          onReveal={() => setShowResponse(true)}
          onClose={handleClose}
        />
      )}
    </main>
  );
}
