export type MindMapCorner = "top-left" | "top-right" | "bottom-left" | "bottom-right";

export type MindMapNode = {
  id: string;
  label: string;
  x: number;
  y: number;
  isHub?: boolean;
};

export type MindMapEdge = {
  from: string;
  to: string;
};

export type MindMapConfig = {
  corner: MindMapCorner;
  hubId: string;
  scrollTarget: string;
  highlightTags: string[];
  tooltip: string;
  nodes: MindMapNode[];
  edges: MindMapEdge[];
};

export const HERO_MIND_MAPS: MindMapConfig[] = [
  {
    corner: "top-left",
    hubId: "ai",
    scrollTarget: "skills",
    highlightTags: ["AI"],
    tooltip: "Explore AI systems",
    nodes: [
      { id: "ai", label: "AI", x: 90, y: 90, isHub: true },
      { id: "llm", label: "LLM", x: 40, y: 50 },
      { id: "agents", label: "Agents", x: 140, y: 45 },
      { id: "data", label: "Data", x: 90, y: 25 },
    ],
    edges: [
      { from: "ai", to: "llm" },
      { from: "ai", to: "agents" },
      { from: "ai", to: "data" },
    ],
  },
  {
    corner: "top-right",
    hubId: "mfg",
    scrollTarget: "vision",
    highlightTags: ["Industrial Digitalization"],
    tooltip: "Manufacturing digitalization",
    nodes: [
      { id: "mfg", label: "Mfg", x: 90, y: 90, isHub: true },
      { id: "jcb", label: "JCB", x: 145, y: 55 },
      { id: "floor", label: "Shop Floor", x: 35, y: 55 },
      { id: "mes", label: "MES", x: 90, y: 25 },
    ],
    edges: [
      { from: "mfg", to: "jcb" },
      { from: "mfg", to: "floor" },
      { from: "mfg", to: "mes" },
    ],
  },
  {
    corner: "bottom-left",
    hubId: "auto",
    scrollTarget: "projects",
    highlightTags: ["Automation"],
    tooltip: "View automation projects",
    nodes: [
      { id: "auto", label: "Auto", x: 90, y: 90, isHub: true },
      { id: "power", label: "Power Apps", x: 40, y: 130 },
      { id: "flow", label: "Workflows", x: 140, y: 130 },
      { id: "rpa", label: "RPA", x: 90, y: 155 },
    ],
    edges: [
      { from: "auto", to: "power" },
      { from: "auto", to: "flow" },
      { from: "auto", to: "rpa" },
    ],
  },
  {
    corner: "bottom-right",
    hubId: "build",
    scrollTarget: "exploring",
    highlightTags: ["Web3", "Quant"],
    tooltip: "Also exploring",
    nodes: [
      { id: "build", label: "Build", x: 90, y: 90, isHub: true },
      { id: "web3", label: "Web3", x: 145, y: 130 },
      { id: "quant", label: "Quant", x: 35, y: 130 },
      { id: "ship", label: "Ship", x: 90, y: 155 },
    ],
    edges: [
      { from: "build", to: "web3" },
      { from: "build", to: "quant" },
      { from: "build", to: "ship" },
    ],
  },
];

export const CORNER_POSITION: Record<MindMapCorner, string> = {
  "top-left": "top-6 left-4 md:top-10 md:left-8",
  "top-right": "top-6 right-4 md:top-10 md:right-8",
  "bottom-left": "bottom-20 left-4 md:bottom-24 md:left-8",
  "bottom-right": "bottom-20 right-4 md:bottom-24 md:right-8",
};
