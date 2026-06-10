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
          blue: "#2c3e94",
          dark: "#171d3d",
          board: "#222c70",
          gold: "#caa94f",
          value: "#ecc66a",
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
