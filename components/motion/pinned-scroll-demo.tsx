"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { gsap, ScrollTrigger, registerGsap } from "@/lib/gsap";
import { scheduleScrollRefresh } from "@/lib/scroll-refresh";
import { spring } from "@/lib/motion";
import type { DemoMedia } from "@/lib/demo-videos";
import { DemoFrame } from "@/components/ui/demo-frame";
import { cn } from "@/lib/utils";

registerGsap();

type Props = {
  demos: DemoMedia[];
};

export function PinnedScrollDemo({ demos }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [pinEnabled, setPinEnabled] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const narrow = window.matchMedia("(max-width: 1023px)").matches;
    setPinEnabled(!reduced && !narrow);
  }, []);

  useEffect(() => {
    if (!pinEnabled || !containerRef.current || !pinRef.current) return;

    const count = demos.length;
    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: () => `+=${window.innerHeight * (count - 0.5)}`,
      pin: pinRef.current,
      scrub: 0.5,
      anticipatePin: 1,
      onUpdate: (self) => {
        const idx = Math.min(count - 1, Math.floor(self.progress * count));
        setActiveIndex(idx);
      },
    });

    scheduleScrollRefresh();

    return () => {
      trigger.kill();
      scheduleScrollRefresh();
    };
  }, [pinEnabled, demos.length]);

  const active = demos[activeIndex] ?? demos[0];

  if (!pinEnabled) {
    return (
      <div className="grid gap-8">
        {demos.map((demo) => (
          <div key={demo.slug} className="demo-showcase-stack-card">
            <DemoFrame
              video={demo.video}
              poster={demo.poster}
              alt={demo.title}
              aspect="video"
            />
            <div className="mt-5 px-1">
              <h3 className="huly-tile-title text-xl font-semibold">{demo.title}</h3>
              <p className="mt-2 huly-muted text-sm">{demo.problem}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {demo.stack.slice(0, 4).map((s) => (
                  <span key={s} className="huly-badge text-[11px]">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div ref={containerRef} style={{ height: `${demos.length * 100}vh` }}>
      <div ref={pinRef} className="demo-showcase-pin flex items-center">
        <div className="max-site w-full py-16">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16 items-center">
            <div className="min-h-[200px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.slug}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={spring}
                >
                  <p className="huly-label mb-3">
                    Project {activeIndex + 1} of {demos.length}
                  </p>
                  <h3 className="huly-title text-2xl md:text-3xl font-semibold">
                    {active.title}
                  </h3>
                  <p className="mt-4 huly-muted leading-relaxed">{active.problem}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {active.stack.map((s) => (
                      <span key={s} className="huly-badge text-[11px]">
                        {s}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="mt-10 flex items-center gap-3">
                {demos.map((demo, i) => (
                  <button
                    key={demo.slug}
                    type="button"
                    className={cn(
                      "demo-showcase-dot",
                      i === activeIndex && "demo-showcase-dot-active"
                    )}
                    aria-label={`Show ${demo.title}`}
                    aria-current={i === activeIndex ? "step" : undefined}
                  />
                ))}
              </div>
            </div>

            <div className="demo-showcase-frame p-3 md:p-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.slug}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.01 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <DemoFrame
                    video={active.video}
                    poster={active.poster}
                    alt={active.title}
                    aspect="video"
                    active={true}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
