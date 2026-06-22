# 🏍️ Japan Traffic Jeopardy

Learn Japanese traffic laws in style. A Jeopardy-style party trivia game about
Japanese traffic & motorcycle laws — built for a group of friends gearing up to
ride motorcycles in Japan.

Play it on one screen (laptop or TV): a host picks clues from the board, teams
shout their answers in the form of a question, and you tap +/- to keep score.

## Features

- **Classic 6×5 Jeopardy board** — six categories, $200–$1000 clues, plus a
  Final Jeopardy round.
- **Randomized question bank** — each game deals a different board by sampling
  one clue per tier from a pool of ~60 clues, so it stays fresh. **🎲 New Board**
  reshuffles (keeping scores); **New Game / Reset** deals a fresh board and zeroes
  scores.
- **Party/host mode** — click a clue, read it aloud, reveal the response and a
  short explanatory note.
- **Team scoreboard** — add teams, quick +/- by the active clue's value, or
  manual adjustments. Negative scores allowed.
- **Auto-save** — the current board and scores persist in your browser
  (localStorage).
- **Themed art** — original SVG logo, motorcycle, torii, Mt. Fuji, and a 止まれ
  stop sign (see [`THEME.md`](./THEME.md)).

### Categories

Rules of the Road · License to Ride · Two-Wheel Law · Don't Drink & Ride ·
Signs & Signals · The Open Road (+ a Final Jeopardy on driving culture).

Content focuses on what actually matters to a foreign rider: licenses/IDP,
helmets, drunk-driving limits, expressway rules, and road signs.

## Tech stack

[Next.js 14 (App Router)](https://nextjs.org/) · TypeScript · Tailwind CSS.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build    # production build
npm start        # serve the production build
```

## Deploy to Vercel (free)

1. Push this repo to GitHub.
2. Go to [vercel.com](https://vercel.com), **New Project**, and import the repo.
3. Vercel auto-detects Next.js — no configuration needed. Click **Deploy**.

Every push to your default branch then redeploys automatically.

## Editing the questions

All questions live in the bank at [`lib/questionBank.ts`](./lib/questionBank.ts).
Each category holds many clues across the dollar tiers; [`lib/board.ts`](./lib/board.ts)
samples one clue per tier per game to build a board, so adding more clues to a
tier just increases the variety. Each clue is a
`{ value, clue, response, note, source, image }` object — edit the text, add
clues/categories, or add Final Jeopardy clues to the `finals` pool. Clues are
phrased as Jeopardy "answers" and responses as questions ("What is…?").

Every clue carries a `source` (`{ label, url }`) pointing at the authoritative
page the fact came from (JAF, NEXCO, the National Police Agency, etc.). The link
is shown under the answer when revealed, so you can always fact-check — and laws
change, so do verify before you rely on anything.

## Disclaimer

For study & fun only. Laws change — always verify current rules with official
sources such as [JAF](https://english.jaf.or.jp/) (Japan Automobile Federation)
and the Japan National Police Agency before you ride.
