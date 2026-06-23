"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { spring } from "@/lib/motion";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { SectionHeader } from "@/components/ui/section-header";
import experience from "@/content/experience.json";

export function Experience() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="experience" className="section bg-bg">
      <div className="max-site">
        <ScrollReveal>
          <SectionHeader label="Experience" title="Experience timeline" />
        </ScrollReveal>

        <div className="relative border-l border-border ml-4 md:ml-8 pl-8 md:pl-12">
          {experience.map((job, i) => {
            const isOpen = open === i;
            return (
              <ScrollReveal key={job.company}>
                <div className="relative pb-12 last:pb-0">
                  <span className="absolute -left-[41px] md:-left-[57px] top-2 h-3 w-3 rounded-full border-2 border-accent bg-bg" />

                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full text-left"
                  >
                    <p className="label">{job.period}</p>
                    <h3 className="mt-1 text-xl font-medium text-foreground">{job.role}</h3>
                    <p className="text-muted">{job.company}</p>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={spring}
                        className="overflow-hidden"
                      >
                        <div className="glass mt-4 rounded-2xl p-6">
                          <p className="text-sm text-muted mb-4">{job.description}</p>
                          <ul className="space-y-2">
                            {job.achievements.map((a) => (
                              <li key={a} className="text-sm text-foreground flex gap-2">
                                <span className="text-accent">·</span>
                                {a}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
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
