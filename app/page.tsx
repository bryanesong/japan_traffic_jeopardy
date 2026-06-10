"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Board from "@/components/Board";
import ClueModal from "@/components/ClueModal";
import Logo from "@/components/Logo";
import Illustration from "@/components/Illustration";
import Scoreboard, { type Team } from "@/components/Scoreboard";
import FinalJeopardy from "@/components/FinalJeopardy";
import { gameData } from "@/lib/gameData";

const STORAGE_KEY = "japan-traffic-jeopardy-state";
// Bump when the board's categories/clues change so old "used cell" data
// (keyed by position) is discarded instead of dimming the wrong clues.
const CONTENT_VERSION = 1;

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
  // Incremented on reset so the Final Jeopardy panel (which holds its own
  // open/revealed state) remounts fresh.
  const [gameId, setGameId] = useState(0);

  // Load persisted state once on mount.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as {
          version?: number;
          teams?: Team[];
          revealed?: Record<string, boolean>;
        };
        if (Array.isArray(parsed.teams)) setTeams(parsed.teams);
        // Only trust saved "used cell" data if it matches the current board.
        if (
          parsed.version === CONTENT_VERSION &&
          parsed.revealed &&
          typeof parsed.revealed === "object"
        ) {
          setRevealed(parsed.revealed);
        }
      }
    } catch {
      // Ignore corrupt / unavailable storage.
    }
    setHydrated(true);
  }, []);

  // Persist whenever teams or revealed cells change (after hydration).
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ version: CONTENT_VERSION, teams, revealed }),
      );
    } catch {
      // Ignore storage write failures (e.g. private mode quotas).
    }
  }, [teams, revealed, hydrated]);

  const activeClue = useMemo(() => {
    if (!active) return null;
    return gameData.categories[active.categoryIndex]?.clues[active.clueIndex] ?? null;
  }, [active]);

  const activeCategoryName = active
    ? gameData.categories[active.categoryIndex]?.name ?? ""
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

  const handleReset = useCallback(() => {
    const ok = window.confirm(
      "Start a new game? This clears all revealed clues and resets every team's score to 0.",
    );
    if (!ok) return;
    setRevealed({});
    setActive(null);
    setShowResponse(false);
    setTeams((prev) => prev.map((t) => ({ ...t, score: 0 })));
    setGameId((id) => id + 1);
  }, []);

  const totalClues = gameData.categories.reduce(
    (sum, c) => sum + c.clues.length,
    0,
  );
  const revealedCount = Object.values(revealed).filter(Boolean).length;

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:py-10">
      <header className="mb-6 text-center">
        <Logo className="mx-auto mb-4 h-24 w-auto sm:h-32" />
        <h1 className="sr-only">
          Japan Traffic Jeopardy
        </h1>
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
        <button
          type="button"
          onClick={handleReset}
          className="rounded-md border-2 border-jeopardy-value px-4 py-2 text-sm font-bold uppercase text-jeopardy-value transition hover:bg-jeopardy-value hover:text-jeopardy-dark"
        >
          New Game / Reset
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(260px,1fr)]">
        <div className="space-y-6">
          <Board
            categories={gameData.categories}
            revealed={revealed}
            onSelect={handleSelect}
          />
          {gameData.finalJeopardy && (
            <FinalJeopardy key={gameId} final={gameData.finalJeopardy} />
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
          onReveal={() => setShowResponse(true)}
          onClose={handleClose}
        />
      )}
    </main>
  );
}
