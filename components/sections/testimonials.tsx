import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { SectionHeader } from "@/components/ui/section-header";
import testimonials from "@/content/testimonials.json";

export function Testimonials() {
  return (
    <section id="testimonials" className="section bg-bg border-y border-border/50">
      <div className="max-site">
        <ScrollReveal>
          <SectionHeader label="Proof" title="What people say" />
        </ScrollReveal>

        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((t) => (
            <ScrollReveal key={t.name}>
              <blockquote className="glass rounded-2xl p-8 h-full">
                <p className="text-foreground leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                <footer className="mt-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/15 text-xs font-medium text-accent">
                    {t.org.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{t.name}</p>
                    <p className="text-xs text-muted">{t.role}</p>
                  </div>
                </footer>
              </blockquote>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-8 opacity-60">
            {["JCB India", "E-Cell VIT", "VIT"].map((org) => (
              <span key={org} className="text-sm font-medium tracking-wide text-muted uppercase">
                {org}
              </span>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
