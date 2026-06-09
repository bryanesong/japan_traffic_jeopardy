"use client";

import { useState } from "react";

export interface Team {
  id: string;
  name: string;
  score: number;
}

interface ScoreboardProps {
  teams: Team[];
  /** The value of the currently active clue, used for quick +/- adjustments. */
  activeValue: number;
  onAddTeam: (name: string) => void;
  onRemoveTeam: (id: string) => void;
  onAdjustScore: (id: string, delta: number) => void;
}

const QUICK_AMOUNTS = [100, 200, 400, 600, 800, 1000];

export default function Scoreboard({
  teams,
  activeValue,
  onAddTeam,
  onRemoveTeam,
  onAdjustScore,
}: ScoreboardProps) {
  const [name, setName] = useState("");

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    onAddTeam(trimmed);
    setName("");
  }

  return (
    <section className="rounded-lg border border-jeopardy-value/40 bg-jeopardy-dark/60 p-4 shadow-lg">
      <h2 className="jeopardy-category mb-3 text-lg font-bold uppercase tracking-wide text-jeopardy-value">
        Scoreboard
      </h2>

      <form onSubmit={handleAdd} className="mb-4 flex gap-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Add a team…"
          className="w-full rounded-md border border-jeopardy-value/40 bg-jeopardy-blue/30 px-3 py-2 text-sm text-white placeholder:text-blue-200/60 focus:outline-none focus:ring-2 focus:ring-jeopardy-value"
          maxLength={24}
        />
        <button
          type="submit"
          className="whitespace-nowrap rounded-md bg-jeopardy-value px-4 py-2 text-sm font-bold uppercase text-jeopardy-dark transition hover:brightness-110"
        >
          Add
        </button>
      </form>

      {teams.length === 0 ? (
        <p className="text-sm italic text-blue-200/70">
          No teams yet. Add a team to start tracking scores.
        </p>
      ) : (
        <ul className="space-y-3">
          {teams.map((team) => (
            <li
              key={team.id}
              className="rounded-md border border-jeopardy-value/20 bg-jeopardy-blue/20 p-3"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="flex min-w-0 items-center gap-2 font-bold text-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/helmet.svg"
                    alt=""
                    aria-hidden="true"
                    className="h-6 w-6 shrink-0"
                  />
                  <span className="truncate">{team.name}</span>
                </span>
                <div className="flex items-center gap-2">
                  <span
                    className={[
                      "jeopardy-value text-xl font-extrabold tabular-nums",
                      team.score < 0 ? "text-red-400" : "text-jeopardy-value",
                    ].join(" ")}
                  >
                    ${team.score}
                  </span>
                  <button
                    type="button"
                    onClick={() => onRemoveTeam(team.id)}
                    aria-label={`Remove ${team.name}`}
                    className="rounded px-2 py-1 text-xs text-blue-200/70 transition hover:bg-red-500/20 hover:text-red-300"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div className="mt-2 flex flex-wrap items-center gap-1">
                {activeValue > 0 && (
                  <>
                    <button
                      type="button"
                      onClick={() => onAdjustScore(team.id, activeValue)}
                      aria-label={`Add $${activeValue} to ${team.name}`}
                      className="rounded bg-green-600/80 px-2 py-1 text-xs font-bold text-white transition hover:bg-green-500"
                    >
                      +${activeValue}
                    </button>
                    <button
                      type="button"
                      onClick={() => onAdjustScore(team.id, -activeValue)}
                      aria-label={`Subtract $${activeValue} from ${team.name}`}
                      className="rounded bg-red-600/80 px-2 py-1 text-xs font-bold text-white transition hover:bg-red-500"
                    >
                      -${activeValue}
                    </button>
                    <span className="mx-1 text-blue-200/40">|</span>
                  </>
                )}
                {QUICK_AMOUNTS.map((amount) => (
                  <button
                    key={amount}
                    type="button"
                    onClick={() => onAdjustScore(team.id, amount)}
                    aria-label={`Add $${amount} to ${team.name}`}
                    className="rounded bg-jeopardy-blue/60 px-2 py-1 text-xs font-semibold text-white transition hover:bg-jeopardy-blue"
                  >
                    +{amount}
                  </button>
                ))}
                {QUICK_AMOUNTS.map((amount) => (
                  <button
                    key={`minus-${amount}`}
                    type="button"
                    onClick={() => onAdjustScore(team.id, -amount)}
                    aria-label={`Subtract $${amount} from ${team.name}`}
                    className="rounded bg-jeopardy-dark px-2 py-1 text-xs font-semibold text-white transition hover:bg-black"
                  >
                    -{amount}
                  </button>
                ))}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
