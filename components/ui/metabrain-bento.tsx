"use client";

import Image from "next/image";
import metabrain from "@/content/metabrain.json";
import { cn } from "@/lib/utils";

type Tile = (typeof metabrain.tiles)[number];

function MetaCard({
  tile,
  className,
  imageClassName,
}: {
  tile: Tile;
  className?: string;
  imageClassName?: string;
}) {
  if (tile.circular) {
    return (
      <div className={cn("metabrain-hub-wrap", className)}>
        <div className="metabrain-hub">
          <div className="relative h-full w-full overflow-hidden rounded-full">
            <Image
              src={tile.image}
              alt={tile.label}
              fill
              className="object-cover"
              sizes="160px"
            />
          </div>
          <button
            type="button"
            className="metabrain-hub-plus"
            aria-label="Add operation"
          >
            +
          </button>
        </div>
      </div>
    );
  }

  return (
    <article className={cn("metabrain-card", className)}>
      <p className="metabrain-card-label">{tile.label}</p>
      <div className={cn("metabrain-card-media", imageClassName)}>
        <Image
          src={tile.image}
          alt={tile.label}
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 100vw, 320px"
        />
      </div>
    </article>
  );
}

function tile(id: string) {
  return metabrain.tiles.find((t) => t.id === id)!;
}

export function MetaBrainBento() {
  return (
    <div className="metabrain-bento">
      <div className="metabrain-beam" aria-hidden />

      <div className="metabrain-grid">
        <div className="metabrain-left">
          <MetaCard tile={tile("automate")} className="metabrain-area-tasks" />
          <MetaCard tile={tile("docs")} className="metabrain-area-notes" />
        </div>

        <MetaCard tile={tile("plan")} className="metabrain-area-plan" />
        <MetaCard tile={tile("hub")} className="metabrain-area-hub" />
        <MetaCard tile={tile("chat")} className="metabrain-area-chat" />

        <MetaCard
          tile={tile("sync")}
          className="metabrain-area-sync"
          imageClassName="metabrain-media-wide"
        />
        <MetaCard
          tile={tile("manage")}
          className="metabrain-area-manage"
          imageClassName="metabrain-media-wide"
        />
      </div>
    </div>
  );
}
