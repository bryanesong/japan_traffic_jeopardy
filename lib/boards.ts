import type { BoardTheme } from "./types";

/**
 * The themed boards offered in the picker menu. Each lists six category names
 * (which must exist in the question bank) used as the board's columns. The
 * "random" board omits categoryNames and instead samples six categories from
 * the whole bank, so it's different every game.
 *
 * As more categories are added to the bank, add/extend boards here.
 */
export const BOARDS: BoardTheme[] = [
  {
    id: "essentials",
    name: "Rider Essentials",
    description: "The core rules every visiting rider should know.",
    categoryNames: [
      "Rules of the Road",
      "License to Ride",
      "Two-Wheel Law",
      "Don't Drink & Ride",
      "Signs & Signals",
      "The Open Road",
    ],
  },
  {
    id: "deepdive",
    name: "Motorcycle Deep-Dive",
    description: "Bikes, gear, licensing, and enforcement.",
    categoryNames: [
      "Two-Wheel Law",
      "Gear & Inspection",
      "License to Ride",
      "Penalties & Police",
      "The Open Road",
      "Money & Logistics",
    ],
  },
  {
    id: "roadsigns",
    name: "Road & Signs",
    description: "Rules, signs, signals, and the open road.",
    categoryNames: [
      "Rules of the Road",
      "Signs & Signals",
      "The Open Road",
      "Penalties & Police",
      "Don't Drink & Ride",
      "Touring Culture",
    ],
  },
  {
    id: "culture",
    name: "Culture & Practicalities",
    description: "Touring life, money, and getting set up.",
    categoryNames: [
      "Touring Culture",
      "Money & Logistics",
      "License to Ride",
      "Gear & Inspection",
      "The Open Road",
      "Rules of the Road",
    ],
  },
  {
    id: "random",
    name: "🎲 Random Mix",
    description: "Six categories drawn at random from the whole bank.",
  },
];

export const DEFAULT_BOARD_ID = "essentials";

export function boardById(id: string): BoardTheme {
  return BOARDS.find((b) => b.id === id) ?? BOARDS[0];
}
