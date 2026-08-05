"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Clue } from "@/lib/types";
import type { Team } from "@/components/Scoreboard";
import Illustration from "@/components/Illustration";

interface ClueModalProps {
  clue: Clue;
  categoryName: string;
  showResponse: boolean;
  teams: Team[];
  /** Apply a score delta to a team (positive = correct, negative = wrong). */
  onScore: (teamId: string, delta: number) => void;
  onReveal: () => void;
  onClose: () => void;
}

// -1 = marked wrong, 0 = unmarked, 1 = marked correct.
type Mark = -1 | 0 | 1;

export default function ClueModal({
  clue,
  categoryName,
  showResponse,
  teams,
  onScore,
  onReveal,
  onClose,
}: ClueModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  // Per-team correct/wrong marks for THIS clue. Toggling re-applies only the
  // incremental score change, so clicking again cleanly undoes it.
  const [marks, setMarks] = useState<Record<string, Mark>>({});

  const scoredTeamIds = useMemo(
    () => new Set(Object.keys(marks).filter((id) => marks[id] !== 0)),
    [marks],
  );

  function setMark(teamId: string, dir: 1 | -1) {
    setMarks((prev) => {
      const current = prev[teamId] ?? 0;
      const next: Mark = current === dir ? 0 : dir;
      // Apply the difference so scores stay correct across toggles/switches.
      onScore(teamId, (next - current) * clue.value);
      return { ...prev, [teamId]: next };
    });
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Move focus into the dialog on open and restore it to the triggering
  // element when the dialog closes.
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();
    return () => previouslyFocused?.focus?.();
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={`${categoryName} clue for $${clue.value}`}
        className="relative w-full max-w-2xl rounded-lg border-4 border-jeopardy-value bg-jeopardy-blue p-6 shadow-2xl outline-none sm:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-2 flex items-center justify-between">
          <span className="jeopardy-category text-sm font-bold uppercase tracking-wide text-jeopardy-value">
            {categoryName}
          </span>
          <span className="jeopardy-value text-xl font-extrabold text-jeopardy-value">
            ${clue.value}
          </span>
        </div>

        <Illustration
          name={clue.image}
          className="mx-auto mt-4 h-28 w-auto object-contain sm:h-36"
        />

        <p className="jeopardy-category py-6 text-center text-xl font-bold uppercase leading-snug text-white sm:py-8 sm:text-3xl">
          {clue.clue}
        </p>

        {showResponse ? (
          <div className="rounded-md bg-jeopardy-dark/60 p-4 text-center">
            <p className="text-lg font-bold text-jeopardy-value sm:text-2xl">
              {clue.response}
            </p>
            {clue.note && (
              <p className="mt-3 text-sm italic text-blue-200">{clue.note}</p>
            )}
            {clue.source && (
              <p className="mt-3 text-xs text-blue-200/70">
                Source:{" "}
                <a
                  href={clue.source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:text-jeopardy-value"
                >
                  {clue.source.label}
                </a>
              </p>
            )}
          </div>
        ) : null}

        {teams.length > 0 ? (
          <div className="mt-6 rounded-md border border-jeopardy-value/30 bg-jeopardy-dark/40 p-3">
            <p className="mb-2 text-center text-xs font-bold uppercase tracking-wide text-jeopardy-value/80">
              Score this clue (${clue.value})
            </p>
            <ul className="space-y-2">
              {teams.map((team) => {
                const mark = marks[team.id] ?? 0;
                return (
                  <li
                    key={team.id}
                    className="flex items-center justify-between gap-2"
                  >
                    <span className="min-w-0 truncate text-sm font-bold text-white">
                      {team.name}
                    </span>
                    <div className="flex shrink-0 gap-2">
                      <button
                        type="button"
                        onClick={() => setMark(team.id, 1)}
                        aria-pressed={mark === 1}
                        aria-label={`Mark ${team.name} correct (+$${clue.value})`}
                        className={[
                          "rounded px-3 py-1 text-sm font-bold transition",
                          mark === 1
                            ? "bg-green-500 text-jeopardy-dark ring-2 ring-green-300"
                            : "bg-green-600/70 text-white hover:bg-green-500",
                        ].join(" ")}
                      >
                        ✔ +${clue.value}
                      </button>
                      <button
                        type="button"
                        onClick={() => setMark(team.id, -1)}
                        aria-pressed={mark === -1}
                        aria-label={`Mark ${team.name} wrong (-$${clue.value})`}
                        className={[
                          "rounded px-3 py-1 text-sm font-bold transition",
                          mark === -1
                            ? "bg-red-500 text-white ring-2 ring-red-300"
                            : "bg-red-600/70 text-white hover:bg-red-500",
                        ].join(" ")}
                      >
                        ✘ −${clue.value}
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
            {scoredTeamIds.size > 0 && (
              <p className="mt-2 text-center text-xs text-blue-200/70">
                Tap a highlighted button again to undo.
              </p>
            )}
          </div>
        ) : null}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          {!showResponse ? (
            <button
              type="button"
              onClick={onReveal}
              className="rounded-md bg-jeopardy-value px-6 py-3 font-bold uppercase text-jeopardy-dark transition hover:brightness-110"
            >
              Reveal Response
            </button>
          ) : null}
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border-2 border-jeopardy-value px-6 py-3 font-bold uppercase text-white transition hover:bg-jeopardy-value hover:text-jeopardy-dark"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
