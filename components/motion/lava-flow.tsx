"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export type LavaIntensity = "subtle" | "hero" | "highlight";

type Blob = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  hue: "purple" | "warm";
};

const CONFIG: Record<
  LavaIntensity,
  { count: number; speed: number; opacity: number; warmRatio: number }
> = {
  subtle: { count: 3, speed: 0.35, opacity: 0.12, warmRatio: 0 },
  highlight: { count: 4, speed: 0.55, opacity: 0.18, warmRatio: 0.25 },
  hero: { count: 6, speed: 0.75, opacity: 0.25, warmRatio: 0.35 },
};

function makeBlobs(w: number, h: number, intensity: LavaIntensity): Blob[] {
  const { count, speed, warmRatio } = CONFIG[intensity];
  return Array.from({ length: count }, (_, i) => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * speed,
    vy: (Math.random() - 0.5) * speed,
    radius: 80 + Math.random() * (intensity === "hero" ? 120 : 80),
    hue: Math.random() < warmRatio || i % 3 === 0 ? "warm" : "purple",
  }));
}

function drawBlob(
  ctx: CanvasRenderingContext2D,
  b: Blob,
  opacity: number,
  surge = 1
) {
  const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.radius * surge);
  if (b.hue === "warm") {
    g.addColorStop(0, `rgba(255, 107, 53, ${opacity * 0.9})`);
    g.addColorStop(0.45, `rgba(255, 80, 40, ${opacity * 0.35})`);
    g.addColorStop(1, "rgba(255, 60, 30, 0)");
  } else {
    g.addColorStop(0, `rgba(139, 124, 255, ${opacity})`);
    g.addColorStop(0.5, `rgba(99, 102, 241, ${opacity * 0.4})`);
    g.addColorStop(1, "rgba(139, 124, 255, 0)");
  }
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(b.x, b.y, b.radius * surge, 0, Math.PI * 2);
  ctx.fill();
}

type Props = {
  intensity?: LavaIntensity;
  className?: string;
};

export function LavaFlow({ intensity = "subtle", className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cfg = CONFIG[intensity];
    let raf = 0;
    let blobs: Blob[] = [];
    let visible = true;
    let surge = 1;
    let surgeTarget = 1;

    const resize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      canvas.width = w;
      canvas.height = h;
      blobs = makeBlobs(w, h, intensity);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    io.observe(container);

    const render = (animate: boolean) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "lighter";

      surge += (surgeTarget - surge) * 0.04;

      for (const b of blobs) {
        drawBlob(ctx, b, cfg.opacity, surge);
      }

      ctx.globalCompositeOperation = "source-over";
    };

    if (reduced) {
      resize();
      render(false);
      return () => {
        ro.disconnect();
        io.disconnect();
      };
    }

    if (intensity === "highlight") {
      const onEnter = () => {
        surgeTarget = 1.2;
        setTimeout(() => {
          surgeTarget = 1;
        }, 800);
      };
      const highlightIo = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) onEnter();
        },
        { threshold: 0.3 }
      );
      highlightIo.observe(container);

      const tick = () => {
        if (visible) {
          for (const b of blobs) {
            b.x += b.vx;
            b.y += b.vy;
            if (b.x < -b.radius) b.x = canvas.width + b.radius;
            if (b.x > canvas.width + b.radius) b.x = -b.radius;
            if (b.y < -b.radius) b.y = canvas.height + b.radius;
            if (b.y > canvas.height + b.radius) b.y = -b.radius;
          }
          render(true);
        }
        raf = requestAnimationFrame(tick);
      };

      raf = requestAnimationFrame(tick);

      return () => {
        cancelAnimationFrame(raf);
        ro.disconnect();
        io.disconnect();
        highlightIo.disconnect();
      };
    }

    const tick = () => {
      if (visible) {
        for (const b of blobs) {
          b.x += b.vx;
          b.y += b.vy;
          if (b.x < -b.radius) b.x = canvas.width + b.radius;
          if (b.x > canvas.width + b.radius) b.x = -b.radius;
          if (b.y < -b.radius) b.y = canvas.height + b.radius;
          if (b.y > canvas.height + b.radius) b.y = -b.radius;
        }
        render(true);
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, [intensity]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        intensity === "hero" && "lava-flow-hero",
        className
      )}
      aria-hidden
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="lava-flow-mask absolute inset-0" />
    </div>
  );
}
