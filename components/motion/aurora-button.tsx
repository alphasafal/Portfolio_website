"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
} from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type AuroraButtonProps = {
  children: React.ReactNode;
  className?: string;
  size?: "default" | "sm" | "lg";
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
};

export function AuroraButton({
  children,
  className,
  size = "default",
  onClick,
  type = "button",
  disabled,
}: AuroraButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const raf = useRef(0);
  const target = useRef({ x: 50, y: 50 });
  const current = useRef({ x: 50, y: 50 });
  const [active, setActive] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [trackCursor, setTrackCursor] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    setReducedMotion(reduced);
    setTrackCursor(!reduced && !coarse);
  }, []);

  const lerpPosition = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    current.current.x += (target.current.x - current.current.x) * 0.12;
    current.current.y += (target.current.y - current.current.y) * 0.12;

    el.style.setProperty("--aurora-x", `${current.current.x}%`);
    el.style.setProperty("--aurora-y", `${current.current.y}%`);

    if (
      active &&
      trackCursor &&
      (Math.abs(target.current.x - current.current.x) > 0.1 ||
        Math.abs(target.current.y - current.current.y) > 0.1)
    ) {
      raf.current = requestAnimationFrame(lerpPosition);
    }
  }, [active, trackCursor]);

  const onMouseMove = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      if (!trackCursor || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      target.current = {
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      };
      if (!raf.current) {
        raf.current = requestAnimationFrame(lerpPosition);
      }
    },
    [trackCursor, lerpPosition]
  );

  const onMouseEnter = useCallback(() => {
    if (leaveTimer.current) {
      clearTimeout(leaveTimer.current);
      leaveTimer.current = null;
    }
    setLeaving(false);
    setActive(true);
    if (trackCursor) {
      raf.current = requestAnimationFrame(lerpPosition);
    }
  }, [trackCursor, lerpPosition]);

  const onMouseLeave = useCallback(() => {
    setActive(false);
    if (raf.current) {
      cancelAnimationFrame(raf.current);
      raf.current = 0;
    }
    target.current = { x: 50, y: 50 };
    if (reducedMotion) return;
    setLeaving(true);
    leaveTimer.current = setTimeout(() => {
      setLeaving(false);
      leaveTimer.current = null;
    }, 600);
  }, [reducedMotion]);

  useEffect(() => {
    return () => {
      if (leaveTimer.current) clearTimeout(leaveTimer.current);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseMove={onMouseMove}
      className={cn(
        buttonVariants({ variant: "outline", size }),
        "aurora-btn relative overflow-hidden",
        active && "aurora-btn-active",
        leaving && "aurora-btn-leaving",
        reducedMotion && "aurora-btn-reduced",
        className
      )}
      style={
        {
          "--aurora-x": "50%",
          "--aurora-y": "50%",
        } as React.CSSProperties
      }
    >
      <span className="aurora-btn-fill" aria-hidden />
      <span className="aurora-btn-label relative z-10">{children}</span>
    </button>
  );
}

/** @deprecated Use AuroraButton */
export const FlameButton = AuroraButton;
