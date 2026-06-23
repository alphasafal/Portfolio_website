"use client";

import { useEffect, useState } from "react";
import { SITE, MAIN_NAV, EXTENDED_NAV } from "@/lib/constants";
import { scrollToSection } from "@/lib/scroll";
import { cn } from "@/lib/utils";

const ALL_NAV = [...MAIN_NAV, ...EXTENDED_NAV];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function go(id: string) {
    scrollToSection(id);
    setOpen(false);
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "glass border-b border-border py-3" : "bg-transparent py-5"
      )}
    >
      <nav className="max-site flex items-center justify-between px-5 md:px-8">
        <button
          type="button"
          onClick={() => scrollToSection("hero")}
          className="text-sm font-medium text-foreground hover:text-accent transition"
        >
          {SITE.name.split(" ")[0]}
        </button>

        <div className="hidden items-center gap-6 lg:flex">
          {MAIN_NAV.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => go(item.id)}
              className="text-sm text-muted hover:text-foreground transition"
            >
              {item.label}
            </button>
          ))}
          <a
            href="/resume-safal-gupta.pdf"
            className="text-sm text-accent hover:text-accent/80 transition"
          >
            Résumé
          </a>
        </div>

        <button
          type="button"
          className="lg:hidden text-sm text-muted"
          onClick={() => setOpen(!open)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>

      {open && (
        <div className="glass mx-4 mt-2 rounded-xl p-4 lg:hidden max-h-[70vh] overflow-y-auto">
          {ALL_NAV.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => go(item.id)}
              className="block w-full py-3 text-left text-foreground"
            >
              {item.label}
            </button>
          ))}
          <a
            href="/resume-safal-gupta.pdf"
            className="block py-3 text-accent"
          >
            Résumé
          </a>
        </div>
      )}
    </header>
  );
}
