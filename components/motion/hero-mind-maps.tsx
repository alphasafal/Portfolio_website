"use client";

import { useEffect, useState } from "react";
import { scrollToSection } from "@/lib/scroll";
import {
  CORNER_POSITION,
  HERO_MIND_MAPS,
  MOBILE_MIND_MAP_DOCK,
  type MindMapConfig,
  type MindMapNode,
} from "@/lib/hero-mind-map";
import { useHeroTagHighlightOptional } from "@/components/motion/hero-tag-highlight";
import { cn } from "@/lib/utils";

function getNode(nodes: MindMapNode[], id: string) {
  return nodes.find((n) => n.id === id);
}

function MindMapCorner({ config }: { config: MindMapConfig }) {
  const highlight = useHeroTagHighlightOptional();
  const [hovered, setHovered] = useState<string | null>(null);
  const active = hovered !== null;

  function onEnter() {
    highlight?.highlight(config.highlightTags);
  }

  function onLeave() {
    setHovered(null);
    highlight?.clearHighlight();
  }

  function onNodeClick() {
    scrollToSection(config.scrollTarget);
    highlight?.highlight(config.highlightTags);
    setTimeout(() => highlight?.clearHighlight(), 1200);
  }

  return (
    <div
      className={cn(
        "hero-mind-map absolute z-[2] hidden md:block",
        CORNER_POSITION[config.corner]
      )}
      onMouseLeave={onLeave}
    >
      {active && (
        <div className="hero-mind-map-tooltip mb-2 text-[10px] text-accent text-center whitespace-nowrap">
          {config.tooltip} →
        </div>
      )}
      <svg
        viewBox="0 0 180 180"
        width={160}
        height={160}
        className="overflow-visible"
        aria-hidden={false}
        role="group"
        aria-label={config.tooltip}
      >
        <defs>
          <radialGradient id={`glow-${config.corner}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(139,124,255,0.35)" />
            <stop offset="100%" stopColor="rgba(139,124,255,0)" />
          </radialGradient>
        </defs>

        {config.edges.map((edge) => {
          const from = getNode(config.nodes, edge.from);
          const to = getNode(config.nodes, edge.to);
          if (!from || !to) return null;
          const lit =
            hovered === edge.from ||
            hovered === edge.to ||
            hovered === config.hubId;
          return (
            <line
              key={`${edge.from}-${edge.to}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              className={cn(
                "hero-mind-map-edge",
                lit && "hero-mind-map-edge-active",
                !lit && "hero-mind-map-edge-idle"
              )}
            />
          );
        })}

        {config.nodes.map((node) => {
          const isHub = node.isHub;
          const lit = hovered === node.id;
          return (
            <g key={node.id}>
              {isHub && (
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={28}
                  fill={`url(#glow-${config.corner})`}
                  className={cn(lit && "opacity-100", !lit && "opacity-40")}
                />
              )}
              <foreignObject
                x={node.x - (isHub ? 24 : 30)}
                y={node.y - (isHub ? 24 : 14)}
                width={isHub ? 48 : 60}
                height={isHub ? 48 : 28}
              >
                <button
                  type="button"
                  onMouseEnter={() => {
                    setHovered(node.id);
                    onEnter();
                  }}
                  onFocus={() => {
                    setHovered(node.id);
                    onEnter();
                  }}
                  onBlur={onLeave}
                  onClick={onNodeClick}
                  aria-label={`${node.label} — ${config.tooltip}`}
                  className={cn(
                    "hero-mind-map-node",
                    isHub && "hero-mind-map-node-hub",
                    lit && "hero-mind-map-node-active"
                  )}
                >
                  {node.label}
                </button>
              </foreignObject>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function MobileMindMapDock() {
  const highlight = useHeroTagHighlightOptional();

  return (
    <div className="hero-mind-map-dock absolute bottom-16 left-1/2 z-[2] flex -translate-x-1/2 gap-2 md:hidden">
      {MOBILE_MIND_MAP_DOCK.map((item) => (
        <button
          key={item.shortLabel}
          type="button"
          onClick={() => {
            scrollToSection(item.scrollTarget);
            highlight?.highlight(item.highlightTags);
            setTimeout(() => highlight?.clearHighlight(), 1200);
          }}
          aria-label={`${item.tooltip} — go to section`}
          className="hero-mind-map-dock-btn"
        >
          {item.shortLabel}
        </button>
      ))}
    </div>
  );
}

export function HeroMindMaps() {
  return (
    <>
      {HERO_MIND_MAPS.map((config) => (
        <MindMapCorner key={config.corner} config={config} />
      ))}
      <MobileMindMapDock />
    </>
  );
}
