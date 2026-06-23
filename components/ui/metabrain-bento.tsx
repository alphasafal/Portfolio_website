"use client";

import Image from "next/image";
import metabrain from "@/content/metabrain.json";
import { cn } from "@/lib/utils";

type Tile = (typeof metabrain.tiles)[number];

const fitClass: Record<string, string> = {
  "contain-bottom": "object-contain object-bottom",
  "cover-center": "object-cover object-center",
};

function MetaCard({
  tile,
  className,
}: {
  tile: Tile;
  className?: string;
}) {
  const fit = fitClass[tile.fit ?? "contain-bottom"];

  return (
    <article className={cn("metabrain-card", tile.wide && "metabrain-card-wide", className)}>
      <p className="metabrain-card-label">{tile.label}</p>
      <div className={cn("metabrain-card-media", tile.wide && "metabrain-card-media-wide")}>
        <Image
          src={tile.image}
          alt={tile.label}
          fill
          className={cn("metabrain-card-img", fit)}
          sizes={tile.wide ? "(max-width: 768px) 100vw, 480px" : "(max-width: 768px) 100vw, 280px"}
        />
      </div>
    </article>
  );
}

function MetaHub() {
  const now = new Date();
  const day = now.getDate().toString().padStart(2, "0");
  const month = now.toLocaleString("en-US", { month: "long" });

  return (
    <div className="metabrain-hub-cell">
      <div className="metabrain-hub">
        <div className="metabrain-hub-texture" aria-hidden />
        <div className="metabrain-hub-date">
          <span className="metabrain-hub-day">{day}</span>
          <span className="metabrain-hub-month">{month}</span>
        </div>
        <button type="button" className="metabrain-hub-plus" aria-label="Add item">
          +
        </button>
      </div>
    </div>
  );
}

function MetaBrainBeam() {
  return (
    <svg
      className="metabrain-beam-svg"
      viewBox="0 0 200 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="metabrainBeamGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#5683da" stopOpacity="0.9" />
          <stop offset="45%" stopColor="#5ec8ff" stopOpacity="1" />
          <stop offset="100%" stopColor="#8b7cff" stopOpacity="0.7" />
        </linearGradient>
        <filter id="metabrainBeamBlur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="8" />
        </filter>
      </defs>
      <path
        className="metabrain-beam-glow"
        d="M 155 30 C 155 120, 155 200, 155 260 C 155 310, 120 340, 70 370"
        stroke="url(#metabrainBeamGrad)"
        strokeWidth="28"
        strokeLinecap="round"
        filter="url(#metabrainBeamBlur)"
        opacity="0.85"
      />
      <path
        className="metabrain-beam-core"
        d="M 155 30 C 155 120, 155 200, 155 260 C 155 310, 120 340, 70 370"
        stroke="url(#metabrainBeamGrad)"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <circle className="metabrain-beam-pulse" cx="155" cy="200" r="18" fill="#5ec8ff" filter="url(#metabrainBeamBlur)" />
    </svg>
  );
}

function tile(id: string) {
  return metabrain.tiles.find((t) => t.id === id)!;
}

export function MetaBrainBento() {
  return (
    <div className="metabrain-bento">
      <MetaBrainBeam />

      <div className="metabrain-grid">
        <MetaCard tile={tile("automate")} className="metabrain-area-tasks" />
        <MetaCard tile={tile("plan")} className="metabrain-area-plan" />
        <MetaHub />
        <MetaCard tile={tile("chat")} className="metabrain-area-chat" />
        <MetaCard tile={tile("docs")} className="metabrain-area-notes" />
        <MetaCard tile={tile("sync")} className="metabrain-area-sync" />
        <MetaCard tile={tile("manage")} className="metabrain-area-manage" />
      </div>
    </div>
  );
}
