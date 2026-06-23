import { HulySection, HulySectionHeader } from "@/components/ui/huly-section";
import { MetaBrainBento } from "@/components/ui/metabrain-bento";
import metabrain from "@/content/metabrain.json";

export function ManufacturingMetaBrain() {
  return (
    <HulySection id="metabrain" className="metabrain-section">
      <div className="metabrain-hero-glow pointer-events-none absolute inset-x-0 top-0 h-64" aria-hidden />
      <div className="relative z-10 max-site">
        <HulySectionHeader
          label={metabrain.label}
          title={metabrain.title}
          description={metabrain.description}
          className="text-center mx-auto max-w-3xl [&_.huly-title]:text-4xl [&_.huly-title]:md:text-5xl [&_.huly-title]:lg:text-6xl"
        />
        <MetaBrainBento />
      </div>
    </HulySection>
  );
}
