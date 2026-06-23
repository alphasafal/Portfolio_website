"use client";

import { useEffect, useState } from "react";

export function CursorGlow() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [enabled, setEnabled] = useState(false);
  const [onLightSection, setOnLightSection] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduced || coarse) return;
    setEnabled(true);

    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      const target = document.elementFromPoint(e.clientX, e.clientY);
      setOnLightSection(!!target?.closest(".huly-section"));
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  if (!enabled) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
      aria-hidden
      style={{
        opacity: onLightSection ? 0 : 1,
        background: `radial-gradient(500px circle at ${pos.x}px ${pos.y}px, rgba(255,107,53,0.06) 0%, rgba(139,124,255,0.1) 35%, transparent 65%)`,
      }}
    />
  );
}
