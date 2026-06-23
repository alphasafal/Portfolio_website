import { HulySection, HulySectionHeader } from "@/components/ui/huly-section";
import { PinnedScrollDemo } from "@/components/motion/pinned-scroll-demo";
import { getProjectDemos } from "@/lib/demo-videos";

export function ProjectDemoShowcase() {
  const demos = getProjectDemos();

  return (
    <HulySection id="demos" dotGrid>
      <div className="relative z-10 max-site">
        <HulySectionHeader
          label="Demos"
          title="Scroll through the work"
          description="Each scroll step walks through a project demo — manufacturing automation, AI assistants, and real-time systems."
        />
        <PinnedScrollDemo demos={demos} />
      </div>
    </HulySection>
  );
}
