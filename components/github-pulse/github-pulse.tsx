import type { GitHubRepo } from "@/lib/github";
import { GlassCard } from "@/components/motion/glass-card";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function GitHubPulse({ repos }: { repos: GitHubRepo[] }) {
  return (
    <GlassCard className="mt-8">
      <p className="label mb-4">Building in public</p>
      <div className="space-y-3">
        {repos.slice(0, 4).map((repo) => (
          <a
            key={repo.name}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between gap-4 border-b border-border pb-3 last:border-0 last:pb-0"
          >
            <div>
              <span className="text-sm font-medium text-foreground group-hover:text-accent transition">
                {repo.name}
              </span>
              {repo.description && (
                <p className="mt-0.5 text-xs text-muted line-clamp-1">{repo.description}</p>
              )}
            </div>
            <span className="text-xs text-muted shrink-0">
              ★ {repo.stargazers_count}
            </span>
          </a>
        ))}
      </div>
    </GlassCard>
  );
}
