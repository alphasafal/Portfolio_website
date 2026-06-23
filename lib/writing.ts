import essays from "@/content/thinking.json";

export type Essay = (typeof essays)[number];

export function getAllEssays(): Essay[] {
  return essays;
}

export function getEssay(slug: string): Essay | undefined {
  return essays.find((e) => e.slug === slug);
}

export function getAllEssaySlugs(): string[] {
  return essays.map((e) => e.slug);
}
