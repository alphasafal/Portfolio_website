"use client";

export function AuroraBeam() {
  return (
    <div className="aurora-beam pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="aurora-beam-core" />
      <div className="aurora-beam-glow" />
    </div>
  );
}
