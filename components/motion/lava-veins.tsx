"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, registerGsap } from "@/lib/gsap";

registerGsap();

const DESKTOP_PATHS = [
  "M 48 0 C 80 400 20 800 55 1200 S 25 2000 50 2800 S 70 3600 40 4400 S 20 5200 60 6000 S 35 6800 50 7600 L 45 9000",
  "M 1392 200 C 1360 600 1410 1000 1375 1400 S 1400 2200 1380 3000 S 1350 3800 1390 4600 S 1410 5400 1370 6200 S 1395 7000 1385 7800 L 1390 9000",
  "M 120 800 C 200 1200 80 1600 150 2000 S 100 2800 180 3200 S 220 4000 140 4800",
  "M 1320 2400 C 1240 2800 1340 3200 1260 3600 S 1300 4400 1280 5200",
  "M 90 5200 C 160 5600 70 6000 130 6400 S 110 7200 100 8000",
];

const MOBILE_PATHS = [
  "M 32 0 C 60 500 15 1000 45 2000 S 25 3500 40 5000 S 55 6500 35 8000 L 38 9000",
  "M 360 300 C 330 900 370 1500 340 2500 S 355 4000 345 5500 S 330 7000 350 8500",
];

export function LavaVeins() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [paths, setPaths] = useState(DESKTOP_PATHS);

  useEffect(() => {
    setPaths(window.innerWidth < 768 ? MOBILE_PATHS : DESKTOP_PATHS);
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const svg = svgRef.current;
    if (!svg || reduced) return;

    const pathEls = svg.querySelectorAll<SVGPathElement>(".lava-vein-path");
    const triggers: ScrollTrigger[] = [];

    pathEls.forEach((path, i) => {
      const len = path.getTotalLength();
      gsap.set(path, { strokeDasharray: len, strokeDashoffset: len, opacity: 0.12 });

      const tween = gsap.to(path, {
        strokeDashoffset: 0,
        opacity: 0.5,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8 + i * 0.12,
        },
      });

      if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, [paths]);

  return (
    <svg
      ref={svgRef}
      className="lava-veins pointer-events-none absolute inset-0 z-[1] h-full w-full"
      viewBox="0 0 1440 9000"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="lava-vein-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#8B7CFF" stopOpacity="0.9" />
          <stop offset="45%" stopColor="#8B7CFF" stopOpacity="0.6" />
          <stop offset="75%" stopColor="#FF6B35" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#FF6B35" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      {paths.map((d, i) => (
        <path
          key={i}
          d={d}
          className="lava-vein-path"
          fill="none"
          stroke="url(#lava-vein-gradient)"
          strokeWidth={1.5}
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}
