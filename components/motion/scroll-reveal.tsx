"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGsap } from "@/lib/gsap";

registerGsap();

type Props = {
  children: ReactNode;
  className?: string;
};

export function ScrollReveal({ children, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced || !ref.current) return;

      gsap.from(ref.current, {
        scrollTrigger: { trigger: ref.current, start: "top 88%" },
        opacity: 0,
        y: 24,
        duration: 0.5,
        ease: "power2.out",
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
