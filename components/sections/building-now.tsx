import { HulySection, HulySectionHeader } from "@/components/ui/huly-section";
import { HulyBuildingTile } from "@/components/ui/huly-bento-tile";
import { getBuildingDemos } from "@/lib/demo-videos";

export function BuildingNow() {
  const items = getBuildingDemos();
  const [copilot, automation, analytics] = items;

  return (
    <HulySection id="building">
      <div className="relative z-10 max-site">
        <HulySectionHeader label="Now" title="Currently building" />

        <div className="grid gap-5 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-7">
            <HulyBuildingTile
              href={copilot.href}
              video={copilot.video}
              poster={copilot.poster}
              alt={copilot.title}
              title={copilot.title}
              caption={copilot.caption}
              status={copilot.status}
              description={copilot.description}
              aspect="wide"
            />
          </div>

          <div className="grid gap-5 lg:col-span-5">
            <HulyBuildingTile
              href={automation.href}
              video={automation.video}
              poster={automation.poster}
              alt={automation.title}
              title={automation.title}
              caption={automation.caption}
              status={automation.status}
              description={automation.description}
              aspect="video"
            />
            <HulyBuildingTile
              href={analytics.href}
              video={analytics.video}
              poster={analytics.poster}
              alt={analytics.title}
              title={analytics.title}
              caption={analytics.caption}
              status={analytics.status}
              description={analytics.description}
              aspect="video"
            />
          </div>
        </div>
      </div>
    </HulySection>
  );
}
