"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { TechBackground } from "@/components/motion/tech-background";
import { SectionHeader } from "@/components/ui/section-header";
import { Badge } from "@/components/ui/badge";
import now from "@/content/now.json";
import { cn } from "@/lib/utils";

const statusStyles: Record<string, string> = {
  "In Progress": "border-accent/40 text-accent",
  Research: "border-amber-500/40 text-amber-400",
  Prototype: "border-emerald-500/40 text-emerald-400",
};

export function BuildingNow() {
  const reduced = useReducedMotion();

  return (
    <section id="building" className="relative section bg-bg overflow-hidden">
      <TechBackground variant="grid" opacity={0.45} />
      <div className="relative z-10 max-site">
        <ScrollReveal>
          <SectionHeader label="Now" title="Currently building" />
        </ScrollReveal>

        <div className="grid gap-6 md:grid-cols-3">
          {now.items.map((item) => {
            const inner = (
              <motion.div
                className="glass rounded-2xl p-8 h-full"
                animate={
                  !reduced && item.status === "In Progress"
                    ? { opacity: [1, 0.85, 1] }
                    : undefined
                }
                transition={
                  item.status === "In Progress"
                    ? { duration: 3, repeat: Infinity, ease: "easeInOut" }
                    : undefined
                }
              >
                <Badge className={cn("mb-4", statusStyles[item.status])}>{item.status}</Badge>
                <h3 className="text-lg font-medium text-foreground">{item.title}</h3>
                <p className="mt-3 text-sm text-muted leading-relaxed">{item.description}</p>
                {item.href && (
                  <p className="mt-4 text-sm text-accent">View progress →</p>
                )}
              </motion.div>
            );

            return (
              <ScrollReveal key={item.title}>
                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block transition hover:opacity-90"
                  >
                    {inner}
                  </a>
                ) : (
                  inner
                )}
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
