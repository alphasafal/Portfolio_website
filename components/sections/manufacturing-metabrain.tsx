import { HulySection } from "@/components/ui/huly-section";
import { MetaBrainBento } from "@/components/ui/metabrain-bento";
import metabrain from "@/content/metabrain.json";

export function ManufacturingMetaBrain() {
  return (
    <HulySection id="metabrain" className="metabrain-section" dotGrid={false}>
      <div className="metabrain-hero-glow pointer-events-none absolute inset-x-0 top-0 h-72" aria-hidden />
      <div className="relative z-10 mx-auto w-full max-w-[1120px] px-5 md:px-8 lg:px-10 py-24 md:py-32">
        <header className="metabrain-header mx-auto mb-14 md:mb-20 max-w-[640px] text-center">
          <h2 className="metabrain-headline">{metabrain.title}</h2>
          <p className="metabrain-subhead">{metabrain.description}</p>
        </header>
        <MetaBrainBento />
      </div>
    </HulySection>
  );
}
