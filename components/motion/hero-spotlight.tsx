"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export function HeroSpotlight() {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    setEnabled(!reduced && !coarse);
  }, []);

  const onMove = useCallback((e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--spot-x", `${x}%`);
    el.style.setProperty("--spot-y", `${y}%`);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [enabled, onMove]);

  if (!enabled) return null;

  return (
    <div
      ref={ref}
      className="hero-spotlight pointer-events-none absolute inset-0 z-[1]"
      aria-hidden
      style={
        {
          "--spot-x": "50%",
          "--spot-y": "40%",
        } as React.CSSProperties
      }
    />
  );
}
