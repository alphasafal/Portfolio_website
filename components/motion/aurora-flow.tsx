"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export type AuroraIntensity = "subtle" | "hero" | "highlight";

type Blob = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  hue: "iris" | "violet" | "indigo";
};

const CONFIG: Record<
  AuroraIntensity,
  { count: number; speed: number; opacity: number }
> = {
  subtle: { count: 3, speed: 0.28, opacity: 0.1 },
  highlight: { count: 4, speed: 0.4, opacity: 0.14 },
  hero: { count: 5, speed: 0.5, opacity: 0.18 },
};

function blobCount(intensity: AuroraIntensity) {
  const mobile = typeof window !== "undefined" && window.innerWidth < 768;
  const base = CONFIG[intensity].count;
  if (mobile && intensity === "hero") return 3;
  if (mobile && intensity === "highlight") return 2;
  return base;
}

function makeBlobs(w: number, h: number, intensity: AuroraIntensity): Blob[] {
  const { speed } = CONFIG[intensity];
  const hues: Blob["hue"][] = ["iris", "violet", "indigo"];
  const count = blobCount(intensity);
  return Array.from({ length: count }, (_, i) => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * speed,
    vy: (Math.random() - 0.5) * speed,
    radius: 100 + Math.random() * (intensity === "hero" ? 140 : 90),
    hue: hues[i % hues.length],
  }));
}

function drawBlob(
  ctx: CanvasRenderingContext2D,
  b: Blob,
  opacity: number,
  surge = 1
) {
  const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.radius * surge);
  if (b.hue === "iris") {
    g.addColorStop(0, `rgba(86, 131, 218, ${opacity})`);
    g.addColorStop(0.5, `rgba(61, 126, 255, ${opacity * 0.4})`);
    g.addColorStop(1, "rgba(86, 131, 218, 0)");
  } else if (b.hue === "violet") {
    g.addColorStop(0, `rgba(139, 124, 255, ${opacity})`);
    g.addColorStop(0.5, `rgba(99, 102, 241, ${opacity * 0.45})`);
    g.addColorStop(1, "rgba(139, 124, 255, 0)");
  } else {
    g.addColorStop(0, `rgba(99, 102, 241, ${opacity * 0.9})`);
    g.addColorStop(0.5, `rgba(86, 131, 218, ${opacity * 0.35})`);
    g.addColorStop(1, "rgba(99, 102, 241, 0)");
  }
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(b.x, b.y, b.radius * surge, 0, Math.PI * 2);
  ctx.fill();
}

type Props = {
  intensity?: AuroraIntensity;
  className?: string;
};

export function AuroraFlow({ intensity = "subtle", className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cfg = CONFIG[intensity];
    let raf = 0;
    let blobs: Blob[] = [];
    let visible = true;
    let surge = 1;
    let surgeTarget = 1;

    const onMove = (e: MouseEvent) => {
      if (intensity !== "hero" || isMobile) return;
      const rect = container.getBoundingClientRect();
      mouse.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const resize = () => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      blobs = makeBlobs(canvas.width, canvas.height, intensity);
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

    if (intensity === "hero" && !isMobile) {
      window.addEventListener("mousemove", onMove, { passive: true });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "screen";
      surge += (surgeTarget - surge) * 0.03;
      for (const b of blobs) {
        drawBlob(ctx, b, cfg.opacity, surge);
      }
      ctx.globalCompositeOperation = "source-over";
    };

    const applyCursorBias = (b: Blob) => {
      if (intensity !== "hero" || isMobile) return;
      const dx = mouse.current.x - b.x;
      const dy = mouse.current.y - b.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 200 && dist > 0) {
        const force = (1 - dist / 200) * 0.025;
        b.vx += (dx / dist) * force;
        b.vy += (dy / dist) * force;
      }
      b.vx *= 0.988;
      b.vy *= 0.988;
    };

    const stepBlobs = () => {
      for (const b of blobs) {
        applyCursorBias(b);
        b.x += b.vx;
        b.y += b.vy;
        if (b.x < -b.radius) b.x = canvas.width + b.radius;
        if (b.x > canvas.width + b.radius) b.x = -b.radius;
        if (b.y < -b.radius) b.y = canvas.height + b.radius;
        if (b.y > canvas.height + b.radius) b.y = -b.radius;
      }
    };

    if (reduced) {
      resize();
      render();
      return () => {
        ro.disconnect();
        io.disconnect();
        window.removeEventListener("mousemove", onMove);
      };
    }

    let highlightIo: IntersectionObserver | undefined;
    if (intensity === "highlight") {
      highlightIo = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            surgeTarget = 1.12;
            setTimeout(() => {
              surgeTarget = 1;
            }, 900);
          }
        },
        { threshold: 0.3 }
      );
      highlightIo.observe(container);
    }

    const tick = () => {
      if (visible) {
        stepBlobs();
        render();
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      highlightIo?.disconnect();
      window.removeEventListener("mousemove", onMove);
    };
  }, [intensity]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        intensity === "hero" && "aurora-flow-hero",
        className
      )}
      aria-hidden
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="aurora-flow-mask absolute inset-0" />
    </div>
  );
}
