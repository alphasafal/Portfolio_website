"use client";

import { SITE, MAIN_NAV } from "@/lib/constants";
import { scrollToSection } from "@/lib/scroll";
import { NewsletterForm } from "@/components/ui/newsletter-form";

export function Footer() {
  return (
    <footer className="border-t border-border py-12 px-5 md:px-8">
      <div className="max-site">
        <div className="mb-10 text-center">
          <p className="text-sm font-medium text-foreground">Join the build log</p>
          <p className="mt-1 text-xs text-muted mb-4">
            Occasional notes on AI, manufacturing, and what I&apos;m shipping.
          </p>
          <NewsletterForm className="max-w-md mx-auto relative" />
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-border">
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} {SITE.name} · {SITE.domain}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {MAIN_NAV.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className="text-sm text-muted hover:text-foreground transition"
              >
                {item.label}
              </button>
            ))}
            <a href="/resume-safal-gupta.pdf" className="text-sm text-accent hover:text-accent/80">
              Résumé
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
