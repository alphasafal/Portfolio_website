import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { Badge } from "@/components/ui/badge";
import exploring from "@/content/exploring.json";

export function Exploring() {
  return (
    <section id="exploring" className="section bg-bg">
      <div className="max-site">
        <ScrollReveal>
          <SectionHeader
            label="Beyond the floor"
            title="Also exploring"
            description="Secondary interests — learning in public, not claiming expertise yet."
          />
        </ScrollReveal>

        <div className="grid gap-6 md:grid-cols-2">
          {exploring.items.map((item) => (
            <ScrollReveal key={item.id}>
              <div className="glass rounded-2xl p-8 h-full">
                <Badge className="mb-4 border-border text-muted">{item.subtitle}</Badge>
                <h3 className="text-2xl font-semibold text-foreground">{item.title}</h3>
                <p className="mt-3 text-muted leading-relaxed">{item.description}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {item.topics.map((topic) => (
                    <Badge key={topic} className="text-xs border-border/60">
                      {topic}
                    </Badge>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
