import { SITE } from "./constants";

export type GitHubRepo = {
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
};

const FALLBACK_REPOS: GitHubRepo[] = [
  {
    name: "neural-pipeline",
    description: "AI workflow orchestration",
    html_url: SITE.social.github,
    stargazers_count: 0,
    language: "TypeScript",
    updated_at: new Date().toISOString(),
  },
  {
    name: "agent-studio",
    description: "Multi-agent automation",
    html_url: SITE.social.github,
    stargazers_count: 0,
    language: "Python",
    updated_at: new Date().toISOString(),
  },
];

export async function fetchPinnedRepos(): Promise<GitHubRepo[]> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${SITE.githubUsername}/repos?sort=updated&per_page=6`,
      {
        next: { revalidate: 3600 },
        headers: { Accept: "application/vnd.github+json" },
      }
    );
    if (!res.ok) return FALLBACK_REPOS;
    const data = (await res.json()) as GitHubRepo[];
    return data.slice(0, 6);
  } catch {
    return FALLBACK_REPOS;
  }
}
