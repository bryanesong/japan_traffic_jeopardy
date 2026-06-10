"use client";

import type { Category } from "@/lib/types";
import Illustration from "@/components/Illustration";

interface BoardProps {
  categories: Category[];
  revealed: Record<string, boolean>;
  onSelect: (categoryIndex: number, clueIndex: number) => void;
}

function cellKey(categoryIndex: number, clueIndex: number) {
  return `${categoryIndex}-${clueIndex}`;
}

export default function Board({ categories, revealed, onSelect }: BoardProps) {
  const rows = categories[0]?.clues.length ?? 0;

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[640px] rounded-lg border-4 border-black bg-black p-1 shadow-2xl">
        {/* Category headers */}
        <div
          className="grid gap-1"
          style={{ gridTemplateColumns: `repeat(${categories.length}, minmax(0, 1fr))` }}
        >
          {categories.map((category) => (
            <div
              key={category.name}
              className="jeopardy-category flex min-h-[64px] flex-col items-center justify-center gap-1 bg-jeopardy-blue px-2 py-3 text-center text-sm font-bold uppercase leading-tight text-white sm:text-base"
            >
              <Illustration
                name={category.image}
                className="h-8 w-auto object-contain sm:h-10"
              />
              {category.name}
            </div>
          ))}
        </div>

        {/* Clue value cells */}
        <div className="mt-1 grid gap-1">
          {Array.from({ length: rows }).map((_, clueIndex) => (
            <div
              key={clueIndex}
              className="grid gap-1"
              style={{
                gridTemplateColumns: `repeat(${categories.length}, minmax(0, 1fr))`,
              }}
            >
              {categories.map((category, categoryIndex) => {
                const clue = category.clues[clueIndex];
                if (!clue) {
                  return <div key={categoryIndex} className="bg-jeopardy-board" />;
                }
                const isRevealed = revealed[cellKey(categoryIndex, clueIndex)];
                return (
                  <button
                    key={categoryIndex}
                    type="button"
                    disabled={isRevealed}
                    onClick={() => onSelect(categoryIndex, clueIndex)}
                    className={[
                      "flex min-h-[72px] items-center justify-center bg-jeopardy-board transition",
                      isRevealed
                        ? "cursor-default opacity-30"
                        : "hover:bg-jeopardy-blue focus:outline-none focus:ring-2 focus:ring-jeopardy-value",
                    ].join(" ")}
                  >
                    {!isRevealed && (
                      <span className="jeopardy-value text-2xl font-extrabold text-jeopardy-value sm:text-3xl">
                        ${clue.value}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
