import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        jeopardy: {
          blue: "#060ce9",
          dark: "#0b0f5a",
          board: "#0a0e8c",
          gold: "#d4a017",
          value: "#e8b923",
        },
      },
      fontFamily: {
        board: [
          "var(--font-board)",
          "'Arial Narrow'",
          "'Helvetica Neue Condensed'",
          "Impact",
          "system-ui",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};

export default config;
