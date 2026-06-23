"use client";

import dynamic from "next/dynamic";
import { CursorGlow } from "@/components/motion/cursor-glow";
import { Nav } from "@/components/ui/nav";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Impact } from "@/components/sections/impact";
import { Projects } from "@/components/sections/projects";
import { Testimonials } from "@/components/sections/testimonials";
import { Writing } from "@/components/sections/writing";
import { Experience } from "@/components/sections/experience";
import { Skills } from "@/components/sections/skills";
import { Exploring } from "@/components/sections/exploring";
import { ManufacturingVision } from "@/components/sections/manufacturing-vision";
import { BuildingNow } from "@/components/sections/building-now";
import { AchievementTimeline } from "@/components/sections/achievement-timeline";
import { Terminal } from "@/components/sections/terminal";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";

const ScrollRobot = dynamic(
  () => import("@/components/motion/scroll-robot").then((m) => m.ScrollRobot),
  { ssr: false }
);

const LavaVeins = dynamic(
  () => import("@/components/motion/lava-veins").then((m) => m.LavaVeins),
  { ssr: false }
);

export function HomePage() {
  return (
    <>
      <CursorGlow />
      <ScrollRobot />
      <Nav />
      <main className="relative">
        <LavaVeins />
        <Hero />
        <About />
        <Impact />
        <Projects />
        <Testimonials />
        <Writing />
        <Experience />
        <Skills />
        <Exploring />
        <ManufacturingVision />
        <BuildingNow />
        <AchievementTimeline />
        <Terminal />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
