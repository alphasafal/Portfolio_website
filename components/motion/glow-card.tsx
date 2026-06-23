"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  type ComponentPropsWithoutRef,
  type MouseEvent,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

type BaseProps = {
  children: ReactNode;
  className?: string;
  active?: boolean;
  beam?: boolean;
  tint?: boolean;
  onMouseEnter?: () => void;
};

type DivProps = BaseProps & {
  as?: "div";
  href?: never;
  type?: never;
  onClick?: ComponentPropsWithoutRef<"div">["onClick"];
};

type ButtonProps = BaseProps & {
  as: "button";
  href?: never;
  type?: "button" | "submit" | "reset";
  onClick?: ComponentPropsWithoutRef<"button">["onClick"];
};

type AnchorProps = BaseProps & {
  as: "a";
  href: string;
  type?: never;
  onClick?: ComponentPropsWithoutRef<"a">["onClick"];
};

export type GlowCardProps = DivProps | ButtonProps | AnchorProps;

export function GlowCard({
  children,
  className,
  active = false,
  beam = true,
  tint = true,
  onMouseEnter,
  as = "div",
  ...rest
}: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const raf = useRef(0);
  const tintEnabled = useRef(true);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    tintEnabled.current = tint && !reduced && !coarse;
  }, [tint]);

  const onShellMouseEnter = useCallback(() => {
    onMouseEnter?.();
  }, [onMouseEnter]);

  const onMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (!tintEnabled.current) return;
    const el = ref.current;
    if (!el) return;

    if (raf.current) cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty("--glow-x", `${x}%`);
      el.style.setProperty("--glow-y", `${y}%`);
    });
  }, []);

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--glow-x", "50%");
    el.style.setProperty("--glow-y", "50%");
  }, []);

  const shellClass = cn(
    "glow-card glass rounded-2xl",
    beam && "glow-card-beam-on",
    tint && "glow-card-tint-on",
    active && "glow-card-active",
    className
  );

  const inner = (() => {
    if (as === "a") {
      const { href, onClick } = rest as AnchorProps;
      const isExternal = href.startsWith("http");
      if (isExternal) {
        return (
          <a
            href={href}
            onClick={onClick}
            target="_blank"
            rel="noopener noreferrer"
            className="glow-card-inner block h-full"
          >
            {children}
          </a>
        );
      }
      return (
        <Link href={href} onClick={onClick} className="glow-card-inner block h-full">
          {children}
        </Link>
      );
    }

    if (as === "button") {
      const { onClick, type = "button" } = rest as ButtonProps;
      return (
        <button
          type={type}
          onClick={onClick}
          className="glow-card-inner block h-full w-full text-left"
        >
          {children}
        </button>
      );
    }

    const { onClick } = rest as DivProps;
    return (
      <div onClick={onClick} className="glow-card-inner relative h-full">
        {children}
      </div>
    );
  })();

  return (
    <div
      ref={ref}
      className={shellClass}
      onMouseEnter={onShellMouseEnter}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {inner}
    </div>
  );
}
