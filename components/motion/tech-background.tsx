"use client";

import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";

const NeuralNetworkBg = dynamic(
  () => import("@/components/motion/neural-network-bg").then((m) => m.NeuralNetworkBg),
  { ssr: false }
);

const LavaFlow = dynamic(
  () => import("@/components/motion/lava-flow").then((m) => m.LavaFlow),
  { ssr: false }
);

export type TechBgVariant = "grid" | "network" | "mesh" | "scan" | "circuit";
export type LavaIntensity = "subtle" | "hero" | "highlight";

type Props = {
  variant: TechBgVariant;
  className?: string;
  /** 0–1 */
  opacity?: number;
  networkDensity?: number;
  lava?: LavaIntensity;
};

function GridLayer() {
  return (
    <>
      <div className="tech-bg-grid absolute inset-0" />
      <div className="tech-bg-glow absolute inset-0" />
    </>
  );
}

function MeshLayer() {
  return (
    <div className="absolute inset-0">
      <div className="tech-bg-orb tech-bg-orb-1" />
      <div className="tech-bg-orb tech-bg-orb-2" />
      <div className="tech-bg-orb tech-bg-orb-3" />
    </div>
  );
}

function ScanLayer() {
  return (
    <>
      <div className="tech-bg-scanlines absolute inset-0" />
      <div className="tech-bg-grid absolute inset-0 opacity-40" />
      <div className="tech-bg-scan-beam absolute inset-0" />
    </>
  );
}

function CircuitLayer() {
  return <div className="tech-bg-circuit absolute inset-0" />;
}

export function TechBackground({
  variant,
  className,
  opacity = 1,
  networkDensity = 28,
  lava,
}: Props) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      style={{ opacity }}
      aria-hidden
    >
      {lava && <LavaFlow intensity={lava} />}
      {variant === "grid" && <GridLayer />}
      {variant === "mesh" && <MeshLayer />}
      {variant === "scan" && <ScanLayer />}
      {variant === "circuit" && <CircuitLayer />}
      {variant === "network" && <NeuralNetworkBg density={networkDensity} />}
    </div>
  );
}
