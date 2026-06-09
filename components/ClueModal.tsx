"use client";

import { useEffect } from "react";
import type { Clue } from "@/lib/types";

interface ClueModalProps {
  clue: Clue;
  categoryName: string;
  showResponse: boolean;
  onReveal: () => void;
  onClose: () => void;
}

export default function ClueModal({
  clue,
  categoryName,
  showResponse,
  onReveal,
  onClose,
}: ClueModalProps) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-lg border-4 border-jeopardy-value bg-jeopardy-blue p-6 shadow-2xl sm:p-10"
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

        <p className="jeopardy-category py-6 text-center text-xl font-bold uppercase leading-snug text-white sm:py-10 sm:text-3xl">
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
