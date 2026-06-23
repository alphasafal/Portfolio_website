"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGsap } from "@/lib/gsap";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { TechBackground } from "@/components/motion/tech-background";
import { SectionHeader } from "@/components/ui/section-header";
import vision from "@/content/vision.json";
import { ArrowRight } from "lucide-react";

registerGsap();

export function ManufacturingVision() {
  const pipelineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced || !pipelineRef.current) return;

      gsap.from(".pipeline-node", {
        scrollTrigger: { trigger: pipelineRef.current, start: "top 85%" },
        opacity: 0,
        y: 20,
        stagger: 0.15,
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.from(".pipeline-arrow", {
        scrollTrigger: { trigger: pipelineRef.current, start: "top 85%" },
        opacity: 0,
        scaleX: 0,
        stagger: 0.15,
        delay: 0.2,
        duration: 0.4,
        ease: "power2.out",
      });
    },
    { scope: pipelineRef }
  );

  return (
    <section id="vision" className="relative section bg-bg overflow-hidden">
      <TechBackground variant="circuit" opacity={0.9} />
      <div className="relative z-10 max-site">
        <ScrollReveal>
          <SectionHeader label="Vision" title={vision.heading} />
        </ScrollReveal>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <ScrollReveal>
            <div className="space-y-5">
              {vision.paragraphs.map((p) => (
                <p key={p} className="text-lg text-muted leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div
              ref={pipelineRef}
              className="glass rounded-2xl p-8 md:p-10 flex flex-wrap items-center justify-center gap-3 md:gap-4"
            >
              {vision.pipeline.map((step, i) => (
                <div key={step} className="flex items-center gap-3 md:gap-4">
                  <div className="pipeline-node glass rounded-xl px-5 py-4 text-center min-w-[100px]">
                    <p className="text-sm font-medium text-foreground">{step}</p>
                  </div>
                  {i < vision.pipeline.length - 1 && (
                    <ArrowRight className="pipeline-arrow h-5 w-5 text-accent shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
