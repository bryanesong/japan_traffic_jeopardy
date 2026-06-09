import type { Metadata } from "next";
import "./globals.css";

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
    images: ["/og-image.svg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-jeopardy-dark text-white antialiased">
        {children}
      </body>
    </html>
  );
}
