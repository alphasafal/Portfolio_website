import Link from "next/link";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { getAllEssays } from "@/lib/writing";

export function Writing() {
  const essays = getAllEssays();

  return (
    <section id="writing" className="section bg-bg">
      <div className="max-site">
        <ScrollReveal>
          <SectionHeader
            label="Thinking"
            title="Writing & ideas"
            description="How I think about building — AI, products, and shipping fast."
          />
        </ScrollReveal>

        <div className="grid gap-4 md:grid-cols-3">
          {essays.map((essay) => (
            <ScrollReveal key={essay.slug}>
              <Link
                href={`/writing/${essay.slug}`}
                className="glass block h-full rounded-2xl p-6 transition hover:border-accent/30"
              >
                <p className="label">{essay.date}</p>
                <h3 className="mt-2 text-lg font-medium text-foreground">{essay.title}</h3>
                <p className="mt-3 text-sm text-muted leading-relaxed line-clamp-3">
                  {essay.excerpt}
                </p>
                <p className="mt-4 text-sm text-accent">Read essay →</p>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
