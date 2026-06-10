"use client";

import { useState } from "react";

interface IllustrationProps {
  /** Filename inside /public/illustrations, e.g. "helmet.png". */
  name?: string;
  alt?: string;
  className?: string;
  /** Optional fallback image path (e.g. "/helmet.svg") tried if `name` is missing. */
  fallbackSrc?: string;
}

/**
 * Renders an Irasutoya (or any) illustration that fails gracefully: if the file
 * isn't present yet it tries the fallback, and if that's missing too it renders
 * nothing — so empty art slots never show a broken-image icon.
 */
export default function Illustration({
  name,
  alt = "",
  className,
  fallbackSrc,
}: IllustrationProps) {
  const initial = name ? `/illustrations/${name}` : fallbackSrc;
  const [src, setSrc] = useState<string | undefined>(initial);

  if (!src) return null;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      aria-hidden={alt === "" ? true : undefined}
      className={className}
      loading="lazy"
      onError={() =>
        setSrc((cur) => (fallbackSrc && cur !== fallbackSrc ? fallbackSrc : undefined))
      }
    />
  );
}
