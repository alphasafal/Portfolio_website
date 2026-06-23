"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { spring } from "@/lib/motion";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { TechBackground } from "@/components/motion/tech-background";
import { SectionHeader } from "@/components/ui/section-header";
import { Badge } from "@/components/ui/badge";
import skills from "@/content/skills.json";
import { cn } from "@/lib/utils";

export function Skills() {
  const [active, setActive] = useState(skills.categories[0].id);

  const selected = skills.categories.find((c) => c.id === active) ?? skills.categories[0];

  return (
    <section id="skills" className="relative section bg-bg overflow-hidden">
      <TechBackground variant="network" opacity={0.6} networkDensity={32} />
      <div className="relative z-10 max-site">
        <ScrollReveal>
          <SectionHeader label="Expertise" title="Technical expertise" />
        </ScrollReveal>

        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {skills.categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActive(cat.id)}
                onMouseEnter={() => setActive(cat.id)}
                className={cn(
                  "glass rounded-2xl p-5 text-left transition",
                  active === cat.id && "border-accent/40 ring-1 ring-accent/20"
                )}
              >
                <span className="h-2 w-2 rounded-full bg-accent inline-block mb-2" />
                <h3 className="text-sm font-medium text-foreground">{cat.name}</h3>
                <p className="mt-1 text-xs text-muted">{cat.skills.length} skills</p>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={spring}
              className="glass rounded-2xl p-8 md:p-10 min-h-[240px]"
            >
              <h3 className="text-2xl font-semibold text-foreground">{selected.name}</h3>
              <div className="mt-6 flex flex-wrap gap-3">
                {selected.skills.map((s, i) => (
                  <motion.div
                    key={s}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ ...spring, delay: i * 0.04 }}
                  >
                    <Badge className="text-sm px-4 py-1.5">{s}</Badge>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
