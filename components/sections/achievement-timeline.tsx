"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { spring } from "@/lib/motion";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { SectionHeader } from "@/components/ui/section-header";
import achievements from "@/content/achievements.json";
import { cn } from "@/lib/utils";

export function AchievementTimeline() {
  const [active, setActive] = useState<number | null>(0);

  return (
    <section id="timeline" className="section bg-bg">
      <div className="max-site">
        <ScrollReveal>
          <SectionHeader label="Journey" title="Achievement timeline" />
        </ScrollReveal>

        <div className="relative border-l border-border ml-4 md:ml-8 pl-8 md:pl-12 max-w-2xl">
          {achievements.map((item, i) => {
            const isActive = active === i;
            return (
              <ScrollReveal key={item.year}>
                <div className="relative pb-10 last:pb-0">
                  <button
                    type="button"
                    onClick={() => setActive(isActive ? null : i)}
                    className="absolute -left-[41px] md:-left-[57px] top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-accent bg-bg text-[10px] text-accent font-medium"
                  >
                    {item.year.slice(2)}
                  </button>

                  <button
                    type="button"
                    onClick={() => setActive(isActive ? null : i)}
                    className="w-full text-left"
                  >
                    <p className="label">{item.year}</p>
                    <h3
                      className={cn(
                        "mt-1 text-lg font-medium transition",
                        isActive ? "text-accent" : "text-foreground"
                      )}
                    >
                      {item.title}
                    </h3>
                  </button>

                  <AnimatePresence>
                    {isActive && (
                      <motion.p
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={spring}
                        className="mt-3 text-sm text-muted leading-relaxed overflow-hidden"
                      >
                        {item.description}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
