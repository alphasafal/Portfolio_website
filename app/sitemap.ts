import { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";
import { getAllSlugs } from "@/lib/projects";
import { getAllEssaySlugs } from "@/lib/writing";

export default function sitemap(): MetadataRoute.Sitemap {
  const projects = getAllSlugs().map((slug) => ({
    url: `${SITE.url}/projects/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const essays = getAllEssaySlugs().map((slug) => ({
    url: `${SITE.url}/writing/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: SITE.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...projects,
    ...essays,
  ];
}
