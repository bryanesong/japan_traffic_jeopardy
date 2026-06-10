import { ImageResponse } from "next/og";

// Generates a real PNG social-share card (1200x630) at build time, so link
// previews work on platforms that don't render SVG OG images.
export const alt = "Japan Traffic Jeopardy";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Emblem (rising-sun disc + Fuji + torii) as a font-free vector data URI.
const emblem = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-72 -72 144 144">
  <g stroke="#d8b75e" stroke-width="6" stroke-linecap="round" opacity="0.9">
    <line x1="0" y1="0" x2="0" y2="-58"/><line x1="0" y1="0" x2="40" y2="-42"/>
    <line x1="0" y1="0" x2="58" y2="0"/><line x1="0" y1="0" x2="40" y2="42"/>
    <line x1="0" y1="0" x2="-40" y2="-42"/><line x1="0" y1="0" x2="-58" y2="0"/>
    <line x1="0" y1="0" x2="-40" y2="42"/>
  </g>
  <circle cx="0" cy="0" r="46" fill="#2c3e94"/>
  <path d="M-44 30 L-10 -22 q10 -14 20 0 L44 30 Z" fill="#1B2A78"/>
  <path d="M-10 -22 q10 -14 20 0 l-6 8 q-4 -4 -8 0 q-4 4 -8 0 Z" fill="#FFFFFF"/>
  <g fill="#E03A2F">
    <path d="M-30 -4 q30 -10 60 0 l0 6 q-30 -8 -60 0 Z"/>
    <rect x="-22" y="8" width="44" height="6"/>
    <rect x="-18" y="-2" width="6" height="34"/>
    <rect x="12" y="-2" width="6" height="34"/>
  </g>
</svg>`;
const emblemSrc = `data:image/svg+xml,${encodeURIComponent(emblem)}`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          alignItems: "center",
          padding: 72,
          boxSizing: "border-box",
          border: "14px solid #caa94f",
          background: "linear-gradient(135deg, #1c2455 0%, #2c3e94 100%)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={emblemSrc} width={320} height={320} alt="" />
        <div
          style={{ display: "flex", flexDirection: "column", marginLeft: 64 }}
        >
          <div style={{ display: "flex", fontSize: 104, color: "#ecc66a", lineHeight: 1}}>
            JAPAN
          </div>
          <div style={{ display: "flex", fontSize: 104, color: "#ecc66a", lineHeight: 1}}>
            TRAFFIC
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 88,
              color: "#f2f4fb",
              letterSpacing: 8,
              lineHeight: 1.15,
            }}
          >
            JEOPARDY
          </div>
          <div style={{ display: "flex", fontSize: 32, color: "#BBD0FF", marginTop: 28 }}>
            Learn Japan&apos;s road &amp; motorcycle laws in style
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
