"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "lenis";
import { registerGsap, gsap, ScrollTrigger } from "@/lib/gsap";

export function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    registerGsap();

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const lenis = prefersReducedMotion
      ? null
      : new Lenis({
          duration: 0.65,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
        });

    const refresh = () => ScrollTrigger.refresh();

    if (lenis) {
      lenis.on("scroll", ScrollTrigger.update);

      ScrollTrigger.scrollerProxy(document.documentElement, {
        scrollTop(value?: number) {
          if (value !== undefined) {
            lenis.scrollTo(value, { immediate: true });
          }
          return lenis.scroll;
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          };
        },
        pinType: document.documentElement.style.transform ? "transform" : "fixed",
      });

      const tick = (time: number) => {
        lenis.raf(time * 1000);
      };

      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      window.addEventListener("load", refresh);
      const refreshTimer = setTimeout(refresh, 500);

      return () => {
        clearTimeout(refreshTimer);
        window.removeEventListener("load", refresh);
        gsap.ticker.remove(tick);
        lenis.destroy();
        ScrollTrigger.scrollerProxy(document.documentElement, {});
      };
    }

    window.addEventListener("load", refresh);
    const refreshTimer = setTimeout(refresh, 500);

    return () => {
      clearTimeout(refreshTimer);
      window.removeEventListener("load", refresh);
    };
  }, []);

  return <>{children}</>;
}
