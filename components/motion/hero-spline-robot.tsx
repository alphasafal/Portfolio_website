"use client";

import { useCallback, useRef, useState } from "react";
import Spline from "@splinetool/react-spline";
import type { Application } from "@splinetool/runtime";
import { SPLINE_HERO_SCENE } from "@/lib/spline-hero";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

export function HeroSplineRobot({ className }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  const onLoad = useCallback((app: Application) => {
    setReady(true);
    // Tighten framing on the robot (crop empty canvas / logo padding)
    try {
      app.setZoom(1.35);
    } catch {
      /* zoom API optional per scene */
    }
  }, []);

  const forwardPointer = useCallback((clientX: number, clientY: number) => {
    const canvas = wrapRef.current?.querySelector("canvas");
    if (!canvas) return;
    canvas.dispatchEvent(
      new MouseEvent("mousemove", {
        clientX,
        clientY,
        bubbles: true,
        view: window,
      })
    );
  }, []);

  const onTouchMove = useCallback(
    (e: React.TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;
      forwardPointer(touch.clientX, touch.clientY);
    },
    [forwardPointer]
  );

  return (
    <div
      ref={wrapRef}
      className={cn("hero-spline-robot", className)}
      onTouchStart={onTouchMove}
      onTouchMove={onTouchMove}
      aria-hidden
    >
      {!ready && <div className="hero-spline-robot-shimmer" />}
      <div className="hero-spline-robot-viewport">
        <Spline
          scene={SPLINE_HERO_SCENE}
          onLoad={onLoad}
          className="hero-spline-robot-canvas"
        />
      </div>
    </div>
  );
}
