import { TiltCard } from "@/components/motion/tilt-card";
import { GlowCard } from "@/components/motion/glow-card";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { TechBackground } from "@/components/motion/tech-background";
import { SectionHeader } from "@/components/ui/section-header";
import { ProjectCover } from "@/components/ui/project-cover";
import { ProductFrame } from "@/components/ui/product-frame";
import { Badge } from "@/components/ui/badge";
import { getAllProjects } from "@/lib/projects";
import { cn } from "@/lib/utils";

export function Projects() {
  const projects = getAllProjects();

  return (
    <section id="projects" className="relative section bg-bg overflow-hidden">
      <TechBackground variant="mesh" lava="highlight" opacity={0.4} />
      <div className="relative z-10 max-site">
        <ScrollReveal>
          <SectionHeader
            label="Work"
            title="Featured projects"
            description="Problem → Solution → Impact. Every build tells a story."
          />
        </ScrollReveal>

        <div className="grid gap-6 lg:grid-cols-2">
          {projects.map((project, i) => (
            <ScrollReveal
              key={project.slug}
              className={cn(project.flagship && "lg:col-span-2")}
            >
              <TiltCard>
                <GlowCard
                  as="a"
                  href={`/projects/${project.slug}`}
                  className="block w-full h-full"
                >
                  <div className="p-8 md:p-10">
                    <ProductFrame className="mb-8">
                      <ProjectCover
                        src={project.image}
                        alt={project.title}
                        gradient={project.gradient}
                        className={cn(
                          "h-44 w-full",
                          project.flagship && "md:h-56"
                        )}
                        priority={i === 0}
                      />
                    </ProductFrame>
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      {project.flagship && (
                        <Badge className="border-accent/30 text-accent">Flagship</Badge>
                      )}
                      {project.metric && (
                        <Badge className="border-border text-muted">{project.metric}</Badge>
                      )}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-semibold text-foreground">
                      {project.title}
                    </h3>
                    <p className="mt-3 text-muted max-w-2xl">{project.description}</p>

                    <div className="mt-8 grid gap-4 md:grid-cols-3 text-sm">
                      <div>
                        <p className="label text-red-400/70">Problem</p>
                        <p className="mt-2 text-muted line-clamp-3">{project.problem}</p>
                      </div>
                      <div>
                        <p className="label text-[var(--color-iris)]">Solution</p>
                        <p className="mt-2 text-muted line-clamp-3">{project.solution}</p>
                      </div>
                      <div>
                        <p className="label text-emerald-400/70">Impact</p>
                        <p className="mt-2 text-muted line-clamp-3">{project.impact}</p>
                      </div>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.stack.map((s) => (
                        <Badge key={s}>{s}</Badge>
                      ))}
                    </div>

                    <p className="mt-6 text-sm text-accent">View case study →</p>
                  </div>
                </GlowCard>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
