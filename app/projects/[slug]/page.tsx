import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProjectCover } from "@/components/ui/project-cover";
import { getAllSlugs, getProject } from "@/lib/projects";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return params.then((p) => {
    const project = getProject(p.slug);
    if (!project) return {};
    return {
      title: project.title,
      description: project.description,
      openGraph: {
        title: project.title,
        description: project.description,
        images: project.image ? [{ url: project.image }] : undefined,
      },
    };
  });
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <main className="min-h-screen bg-bg">
      <div className="max-site section">
        <Link href="/#projects" className="text-sm text-muted hover:text-accent transition">
          ← Back to projects
        </Link>

        <ProjectCover
          src={project.image}
          alt={project.title}
          gradient={project.gradient}
          className="mt-8 h-52 md:h-72"
          priority
        />

        <div className="flex flex-wrap items-center gap-3 mt-8">
          <p className="label">Case Study</p>
          {project.metric && <Badge>{project.metric}</Badge>}
        </div>
        <h1 className="mt-2 text-4xl md:text-5xl font-semibold text-foreground">{project.title}</h1>
        <p className="mt-4 text-lg text-muted max-w-2xl">{project.description}</p>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          <div className="glass rounded-2xl p-8">
            <p className="label text-red-400/80">Problem</p>
            <p className="mt-3 text-foreground leading-relaxed">{project.problem}</p>
          </div>
          <div className="glass rounded-2xl p-8">
            <p className="label text-accent">Solution</p>
            <p className="mt-3 text-foreground leading-relaxed">{project.solution}</p>
          </div>
          <div className="glass rounded-2xl p-8">
            <p className="label text-emerald-400/80">Impact</p>
            <p className="mt-3 text-foreground leading-relaxed">{project.impact}</p>
          </div>
        </div>

        <div className="mt-12">
          <p className="label mb-4">Tech Stack</p>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <Badge key={s}>{s}</Badge>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-wrap gap-4">
          <Button asChild>
            <Link href="/#contact">Get In Touch</Link>
          </Button>
          {project.url && (
            <Button variant="outline" asChild>
              <a href={project.url} target="_blank" rel="noopener noreferrer">
                View on GitHub
              </a>
            </Button>
          )}
          <Button variant="outline" asChild>
            <Link href="/#projects">More Projects</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
