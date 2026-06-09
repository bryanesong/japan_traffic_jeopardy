import type { Metadata } from "next";
import { Anton, Oswald } from "next/font/google";
import "./globals.css";

// Oswald drives the board/value/category text (the --font-board variable),
// Anton is the heavy show-card display face for the main title.
const oswald = Oswald({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-board",
  display: "swap",
});

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ??
      (process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000"),
  ),
  title: "Japan Traffic Jeopardy",
  description:
    "A Jeopardy-style party trivia game about Japanese traffic and motorcycle laws. For study & fun.",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Japan Traffic Jeopardy",
    description:
      "Learn Japanese traffic & motorcycle laws in style before your ride.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${oswald.variable} ${anton.variable}`}>
      <body className="min-h-screen bg-jeopardy-dark text-white antialiased">
        {children}
      </body>
    </html>
  );
}
