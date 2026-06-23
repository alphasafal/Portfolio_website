"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { DemoFrame } from "@/components/ui/demo-frame";

type BentoTileProps = {
  href?: string | null;
  video: string;
  poster: string;
  alt: string;
  title: string;
  caption: string;
  metric?: string | null;
  flagship?: boolean;
  className?: string;
  aspect?: "video" | "square" | "wide";
  priority?: boolean;
};

export function HulyBentoTile({
  href,
  video,
  poster,
  alt,
  title,
  caption,
  metric,
  flagship,
  className,
  aspect = "video",
  priority,
}: BentoTileProps) {
  const inner = (
    <div className={cn("huly-bento-tile group h-full", className)}>
      <DemoFrame
        video={video}
        poster={poster}
        alt={alt}
        aspect={aspect}
        priority={priority}
      />
      <div className="mt-5 px-1">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          {flagship && (
            <span className="huly-badge huly-badge-accent text-[11px]">Flagship</span>
          )}
          {metric && <span className="huly-badge text-[11px]">{metric}</span>}
        </div>
        <h3 className="huly-tile-title text-lg md:text-xl font-semibold">{title}</h3>
        <p className="mt-2 huly-muted text-sm leading-relaxed">{caption}</p>
        {href && (
          <p className="mt-3 text-sm font-medium text-[#5683da] opacity-0 transition-opacity group-hover:opacity-100">
            View case study →
          </p>
        )}
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block h-full rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5683da]">
        {inner}
      </Link>
    );
  }

  return inner;
}

type BuildingTileProps = {
  href?: string | null;
  video: string;
  poster: string;
  alt: string;
  title: string;
  caption: string;
  status: string;
  description: string;
  className?: string;
  aspect?: "video" | "square" | "wide";
};

const statusStyles: Record<string, string> = {
  "In Progress": "huly-badge-accent",
  Research: "huly-badge-warn",
  Prototype: "huly-badge-success",
};

export function HulyBuildingTile({
  href,
  video,
  poster,
  alt,
  title,
  caption,
  status,
  description,
  className,
  aspect = "video",
}: BuildingTileProps) {
  const inner = (
    <div className={cn("huly-bento-tile huly-building-tile h-full", className)}>
      <DemoFrame video={video} poster={poster} alt={alt} aspect={aspect} />
      <div className="mt-5 px-1">
        <span className={cn("huly-badge text-[11px]", statusStyles[status] ?? "")}>
          {status}
        </span>
        <h3 className="huly-tile-title mt-3 text-lg font-semibold">{title}</h3>
        <p className="mt-2 huly-muted text-sm leading-relaxed">{description}</p>
        <p className="mt-2 text-xs huly-muted/80">{caption}</p>
        {href && (
          <p className="mt-3 text-sm font-medium text-[#5683da]">View progress →</p>
        )}
      </div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5683da]"
      >
        {inner}
      </a>
    );
  }

  return inner;
}
