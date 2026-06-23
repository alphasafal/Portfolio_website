import { HulySection, HulySectionHeader } from "@/components/ui/huly-section";
import { HulyBentoTile } from "@/components/ui/huly-bento-tile";
import { getAllProjects } from "@/lib/projects";
import { getDemoForProject } from "@/lib/demo-videos";
import { cn } from "@/lib/utils";

export function Projects() {
  const projects = getAllProjects();
  const flagship = projects.find((p) => p.flagship) ?? projects[0];
  const handover = projects.find((p) => p.slug === "equipment-handover")!;
  const aiAssistant = projects.find((p) => p.slug === "ai-manufacturing-assistant")!;
  const fraudguard = projects.find((p) => p.slug === "fraudguard")!;

  return (
    <HulySection id="projects">
      <div className="relative z-10 max-site">
        <HulySectionHeader
          label="Work"
          title="Featured projects"
          description="Problem → Solution → Impact. Every build tells a story."
        />

        <div className="grid gap-5 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-8">
            <HulyBentoTile
              href={`/projects/${flagship.slug}`}
              video={getDemoForProject(flagship).video}
              poster={getDemoForProject(flagship).poster}
              alt={flagship.title}
              title={flagship.title}
              caption={flagship.demoCaption}
              metric={flagship.metric}
              flagship
              aspect="wide"
              priority
              className="h-full"
            />
          </div>

          <div className="lg:col-span-4">
            <HulyBentoTile
              href={`/projects/${handover.slug}`}
              video={getDemoForProject(handover).video}
              poster={getDemoForProject(handover).poster}
              alt={handover.title}
              title={handover.title}
              caption={handover.demoCaption}
              metric={handover.metric}
              aspect="square"
              className="h-full"
            />
          </div>

          <div className="lg:col-span-4">
            <HulyBentoTile
              href={`/projects/${aiAssistant.slug}`}
              video={getDemoForProject(aiAssistant).video}
              poster={getDemoForProject(aiAssistant).poster}
              alt={aiAssistant.title}
              title={aiAssistant.title}
              caption={aiAssistant.demoCaption}
              metric={aiAssistant.metric}
              aspect="square"
              className="h-full"
            />
          </div>

          <div className={cn("lg:col-span-8")}>
            <HulyBentoTile
              href={`/projects/${fraudguard.slug}`}
              video={getDemoForProject(fraudguard).video}
              poster={getDemoForProject(fraudguard).poster}
              alt={fraudguard.title}
              title={fraudguard.title}
              caption={fraudguard.demoCaption}
              metric={fraudguard.metric}
              aspect="wide"
              className="h-full"
            />
          </div>
        </div>
      </div>
    </HulySection>
  );
}
