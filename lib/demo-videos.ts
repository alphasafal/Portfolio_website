import projects from "@/content/projects.json";
import now from "@/content/now.json";
import type { Project } from "@/lib/projects";

export type DemoMedia = {
  slug: string;
  title: string;
  video: string;
  poster: string;
  caption: string;
  problem: string;
  stack: string[];
  href?: string | null;
};

export type BuildingDemo = {
  id: string;
  title: string;
  status: string;
  description: string;
  video: string;
  poster: string;
  caption: string;
  href: string | null;
};

export function getProjectDemos(): DemoMedia[] {
  return projects.map((p) => ({
    slug: p.slug,
    title: p.title,
    video: p.demoVideo,
    poster: p.demoPoster,
    caption: p.demoCaption,
    problem: p.problem,
    stack: p.stack,
    href: `/projects/${p.slug}`,
  }));
}

export function getDemoForProject(project: Project): DemoMedia {
  return {
    slug: project.slug,
    title: project.title,
    video: project.demoVideo,
    poster: project.demoPoster,
    caption: project.demoCaption,
    problem: project.problem,
    stack: project.stack,
    href: `/projects/${project.slug}`,
  };
}

export function getBuildingDemos(): BuildingDemo[] {
  return now.items.map((item) => ({
    id: item.id,
    title: item.title,
    status: item.status,
    description: item.description,
    video: item.demoVideo,
    poster: item.demoPoster,
    caption: item.demoCaption,
    href: item.href,
  }));
}
