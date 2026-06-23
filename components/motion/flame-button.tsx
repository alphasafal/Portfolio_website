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

type FlameButtonProps = {
  children: React.ReactNode;
  className?: string;
  size?: "default" | "sm" | "lg";
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
};

export function FlameButton({
  children,
  className,
  size = "default",
  onClick,
  type = "button",
  disabled,
}: FlameButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
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

  const onMouseMove = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      if (!trackCursor || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      ref.current.style.setProperty("--flame-x", `${x}%`);
      ref.current.style.setProperty("--flame-y", `${y}%`);
    },
    [trackCursor]
  );

  const onMouseEnter = useCallback(() => {
    if (leaveTimer.current) {
      clearTimeout(leaveTimer.current);
      leaveTimer.current = null;
    }
    setLeaving(false);
    setActive(true);
  }, []);

  const onMouseLeave = useCallback(() => {
    setActive(false);
    if (reducedMotion) return;
    setLeaving(true);
    leaveTimer.current = setTimeout(() => {
      setLeaving(false);
      leaveTimer.current = null;
    }, 400);
  }, [reducedMotion]);

  useEffect(() => {
    return () => {
      if (leaveTimer.current) clearTimeout(leaveTimer.current);
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
        "flame-btn relative overflow-hidden",
        active && "flame-btn-active",
        leaving && "flame-btn-leaving",
        reducedMotion && "flame-btn-reduced",
        className
      )}
      style={
        {
          "--flame-x": "50%",
          "--flame-y": "50%",
        } as React.CSSProperties
      }
    >
      <span className="flame-btn-fill" aria-hidden />
      <span className="flame-btn-label relative z-10">{children}</span>
    </button>
  );
}
