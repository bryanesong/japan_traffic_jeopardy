"use client";

import { useState } from "react";
import type { FinalJeopardy as FinalJeopardyData } from "@/lib/types";
import Illustration from "@/components/Illustration";

interface FinalJeopardyProps {
  final: FinalJeopardyData;
}

export default function FinalJeopardy({ final }: FinalJeopardyProps) {
  const [open, setOpen] = useState(false);
  const [showResponse, setShowResponse] = useState(false);

  return (
    <section className="rounded-lg border-2 border-jeopardy-value/60 bg-jeopardy-dark/60 p-6 shadow-lg">
      <h2 className="jeopardy-category mb-2 text-center text-2xl font-bold uppercase tracking-wide text-jeopardy-value">
        Final Jeopardy
      </h2>
      <p className="mb-4 text-center text-sm font-semibold uppercase tracking-wide text-blue-200">
        {final.category}
      </p>

      {!open ? (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="rounded-md bg-jeopardy-value px-8 py-3 font-bold uppercase text-jeopardy-dark transition hover:brightness-110"
          >
            Reveal Final Clue
          </button>
        </div>
      ) : (
        <div className="space-y-5">
          <Illustration
            name={final.image}
            className="mx-auto h-24 w-auto object-contain sm:h-28"
          />
          <p className="jeopardy-category mx-auto max-w-3xl text-center text-xl font-bold uppercase leading-snug text-white sm:text-2xl">
            {final.clue}
          </p>

          {showResponse ? (
            <div className="mx-auto max-w-2xl rounded-md bg-jeopardy-blue/40 p-4 text-center">
              <p className="text-lg font-bold text-jeopardy-value sm:text-2xl">
                {final.response}
              </p>
              {final.note && (
                <p className="mt-3 text-sm italic text-blue-200">{final.note}</p>
              )}
              {final.source && (
                <p className="mt-3 text-xs text-blue-200/70">
                  Source:{" "}
                  <a
                    href={final.source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2 hover:text-jeopardy-value"
                  >
                    {final.source.label}
                  </a>
                </p>
              )}
            </div>
          ) : (
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => setShowResponse(true)}
                className="rounded-md bg-jeopardy-value px-8 py-3 font-bold uppercase text-jeopardy-dark transition hover:brightness-110"
              >
                Reveal Response
              </button>
            </div>
          )}

          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                setShowResponse(false);
              }}
              className="rounded-md border-2 border-jeopardy-value px-6 py-2 text-sm font-bold uppercase text-white transition hover:bg-jeopardy-value hover:text-jeopardy-dark"
            >
              Hide
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
