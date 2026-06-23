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

  const onLoad = useCallback(() => {
    setReady(true);
  }, []);

  const forwardPointer = useCallback((clientX: number, clientY: number) => {
    const canvas = wrapRef.current?.querySelector("canvas");
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
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
      <Spline
        scene={SPLINE_HERO_SCENE}
        onLoad={(_app: Application) => onLoad()}
        className="hero-spline-robot-canvas"
      />
    </div>
  );
}
