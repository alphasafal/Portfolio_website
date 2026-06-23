"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { SITE } from "@/lib/constants";
import { fadeUp, spring, staggerContainer } from "@/lib/motion";
import { scrollToSection } from "@/lib/scroll";
import { MagneticButton } from "@/components/motion/magnetic-button";
import { RotatingText } from "@/components/motion/rotating-text";
import { TechBackground } from "@/components/motion/tech-background";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ParticleField = dynamic(
  () => import("@/components/motion/particle-field").then((m) => m.ParticleField),
  { ssr: false }
);

const nameParts = SITE.name.split(" ");

function Tag({ children, secondary = false }: { children: string; secondary?: boolean }) {
  return (
    <span
      className={cn(
        "rounded-full border px-4 py-1.5 text-xs md:text-sm",
        secondary
          ? "border-border/60 bg-surface/30 text-muted/80 text-[11px] md:text-xs"
          : "border-border bg-surface/50 text-muted"
      )}
    >
      {children}
    </span>
  );
}

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center bg-bg overflow-hidden"
    >
      <TechBackground variant="mesh" opacity={0.7} />
      <ParticleField />

      <div className="relative z-10 max-site section w-full flex flex-col items-center text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          <h1 className="display-name text-[clamp(3rem,12vw,6rem)] text-foreground">
            {nameParts.map((part, i) => (
              <motion.span
                key={part}
                variants={fadeUp}
                transition={{ ...spring, delay: 0.2 + i * 0.12 }}
                className="inline-block mr-[0.2em]"
              >
                {part}
              </motion.span>
            ))}
          </h1>

          <motion.p
            variants={fadeUp}
            transition={{ ...spring, delay: 0.5 }}
            className="mt-8 text-xl md:text-2xl text-muted font-light min-h-[4.5rem] md:min-h-[3.5rem] flex items-center justify-center"
          >
            <RotatingText messages={SITE.heroMissions} />
          </motion.p>

          <motion.div
            variants={fadeUp}
            transition={{ ...spring, delay: 0.65 }}
            className="mt-6 flex flex-col items-center gap-2"
          >
            <div className="flex flex-wrap items-center justify-center gap-2">
              {SITE.heroTagsPrimary.map((part) => (
                <Tag key={part}>{part}</Tag>
              ))}
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {SITE.heroTagsSecondary.map((part) => (
                <Tag key={part} secondary>
                  {part}
                </Tag>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            transition={{ ...spring, delay: 0.8 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-4"
          >
            <MagneticButton>
              <Button size="lg" onClick={() => scrollToSection("projects")}>
                View Projects
              </Button>
            </MagneticButton>
            <MagneticButton>
              <Button size="lg" variant="outline" onClick={() => scrollToSection("contact")}>
                Get In Touch
              </Button>
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>

      <button
        type="button"
        onClick={() => scrollToSection("about")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-muted hover:text-accent transition"
        aria-label="Scroll to about"
      >
        <span className="text-xs">Scroll</span>
        <ChevronDown className="h-4 w-4 animate-bounce" />
      </button>
    </section>
  );
}
