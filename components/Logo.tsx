// Inline SVG logo so the wordmark renders in the loaded Anton display font
// (an <img>-referenced SVG cannot use the page's web fonts).
export default function Logo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 520 260"
      role="img"
      aria-label="Japan Traffic Jeopardy"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Japan Traffic Jeopardy</title>
      <defs>
        <linearGradient id="logoBadge" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#34468f" />
          <stop offset="1" stopColor="#2c3e94" />
        </linearGradient>
        <linearGradient id="logoGold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f3da93" />
          <stop offset="0.5" stopColor="#ecc66a" />
          <stop offset="1" stopColor="#caa94f" />
        </linearGradient>
      </defs>

      <rect
        x="10"
        y="10"
        width="500"
        height="240"
        rx="22"
        fill="url(#logoBadge)"
        stroke="#e0bd5e"
        strokeWidth="4"
      />

      {/* emblem: rising-sun rays behind torii + Fuji */}
      <g transform="translate(150 96)">
        <g stroke="#e0bd5e" strokeWidth="6" strokeLinecap="round" opacity="0.85">
          <line x1="0" y1="0" x2="0" y2="-58" />
          <line x1="0" y1="0" x2="40" y2="-42" />
          <line x1="0" y1="0" x2="58" y2="0" />
          <line x1="0" y1="0" x2="40" y2="42" />
          <line x1="0" y1="0" x2="-40" y2="-42" />
          <line x1="0" y1="0" x2="-58" y2="0" />
          <line x1="0" y1="0" x2="-40" y2="42" />
        </g>
        <circle cx="0" cy="0" r="46" fill="#2c3e94" />
        <path d="M-44 30 L-10 -22 q10 -14 20 0 L44 30 Z" fill="#1B2A78" />
        <path
          d="M-10 -22 q10 -14 20 0 l-6 8 q-4 -4 -8 0 q-4 4 -8 0 Z"
          fill="#FFFFFF"
        />
        <g fill="#E03A2F">
          <path d="M-30 -4 q30 -10 60 0 l0 6 q-30 -8 -60 0 Z" />
          <rect x="-22" y="8" width="44" height="6" />
          <rect x="-18" y="-2" width="6" height="34" />
          <rect x="12" y="-2" width="6" height="34" />
        </g>
      </g>

      {/* motorcycle silhouette */}
      <g transform="translate(238 178) scale(0.62)" fill="#e0bd5e">
        <circle
          cx="56"
          cy="118"
          r="30"
          fill="none"
          stroke="#e0bd5e"
          strokeWidth="9"
        />
        <circle
          cx="200"
          cy="118"
          r="30"
          fill="none"
          stroke="#e0bd5e"
          strokeWidth="9"
        />
        <path d="M56 118 L92 74 L150 74 L120 118 Z" />
        <path d="M88 80 q20 -20 56 -18 l12 4 q6 8 -4 12 l-44 8 q-18 4 -20 -6 Z" />
        <rect x="108" y="88" width="40" height="24" rx="4" />
        <path d="M120 116 L196 120 q10 1 10 5 q0 5 -10 4 L120 124 Z" />
        <path
          d="M150 74 L168 58 L196 62"
          fill="none"
          stroke="#e0bd5e"
          strokeWidth="8"
          strokeLinecap="round"
        />
      </g>

      {/* wordmark — uses the loaded Anton display font */}
      <text
        x="260"
        y="150"
        textAnchor="middle"
        style={{ fontFamily: "var(--font-display), 'Arial Black', sans-serif" }}
        fontSize="40"
        letterSpacing="1.5"
        fill="url(#logoGold)"
        stroke="#0B1560"
        strokeWidth="0.6"
      >
        JAPAN TRAFFIC
      </text>
      <text
        x="260"
        y="226"
        textAnchor="middle"
        style={{ fontFamily: "var(--font-display), 'Arial Black', sans-serif" }}
        fontSize="34"
        letterSpacing="4"
        fill="#FFFFFF"
      >
        JEOPARDY
      </text>
    </svg>
  );
}
