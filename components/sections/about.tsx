"use client";

import Image from "next/image";
import { SITE } from "@/lib/constants";
import { ART, PORTRAIT_SIZES } from "@/lib/art-images";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { TechBackground } from "@/components/motion/tech-background";
import { SectionHeader } from "@/components/ui/section-header";

export function About() {
  return (
    <section id="about" className="relative section bg-bg overflow-hidden">
      <TechBackground variant="grid" lava="subtle" opacity={0.45} />
      <div className="relative z-10 max-site">
        <ScrollReveal>
          <SectionHeader label="About" title="Engineering the Next Industrial Revolution" />
        </ScrollReveal>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <ScrollReveal>
            <div className="space-y-5">
              {SITE.bio.map((paragraph) => (
                <p key={paragraph} className="text-lg text-foreground leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="flex justify-center lg:justify-end">
              <div className="portrait-frame relative h-64 w-64 sm:h-72 sm:w-72 md:h-80 md:w-80 shrink-0">
                <div
                  className="absolute inset-0 rounded-full bg-gradient-to-br from-accent/50 via-accent/20 to-transparent p-[3px] shadow-[0_0_40px_rgba(139,124,255,0.25)]"
                  aria-hidden
                />
                <div className="absolute inset-[3px] rounded-full bg-bg p-[2px] ring-1 ring-white/10">
                  <div className="relative h-full w-full overflow-hidden rounded-full bg-[#0c0c10]">
                    <Image
                      src={ART.portrait}
                      alt={`${SITE.name} — professional portrait`}
                      fill
                      unoptimized
                      draggable={false}
                      className="portrait-img object-cover object-[center_12%]"
                      sizes={PORTRAIT_SIZES}
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
