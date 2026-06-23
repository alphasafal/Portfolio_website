import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { CountUp } from "@/components/motion/count-up";
import { TechBackground } from "@/components/motion/tech-background";
import { SectionHeader } from "@/components/ui/section-header";
import impact from "@/content/impact.json";

export function Impact() {
  return (
    <section id="impact" className="relative section bg-bg overflow-hidden">
      <TechBackground variant="grid" opacity={0.85} />
      <div className="relative z-10 max-site">
        <ScrollReveal>
          <SectionHeader label="Impact" title="Impact dashboard" />
        </ScrollReveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {impact.map((metric) => (
            <ScrollReveal key={metric.label}>
              <div className="glass rounded-2xl p-8 text-center">
                <p className="text-4xl md:text-5xl font-semibold text-accent tabular-nums">
                  <CountUp value={metric.value} suffix={metric.suffix} />
                </p>
                <p className="mt-3 text-sm text-muted">{metric.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-muted/80">
          Cumulative metrics across personal projects, internships, and automation work.
        </p>
      </div>
    </section>
  );
}
