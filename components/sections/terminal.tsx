"use client";

import { FormEvent, KeyboardEvent, useCallback, useRef, useState } from "react";
import Link from "next/link";
import { spring } from "@/lib/motion";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { TechBackground } from "@/components/motion/tech-background";
import { SectionHeader } from "@/components/ui/section-header";
import { runTerminalCommand, type TerminalLine } from "@/lib/terminal-commands";
import { useKonamiCode } from "@/hooks/use-konami-code";
import vault from "@/content/vault.json";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

type HistoryEntry = {
  input: string;
  lines: TerminalLine[];
};

export function Terminal() {
  const [history, setHistory] = useState<HistoryEntry[]>([
    {
      input: "",
      lines: [
        { type: "output", text: "Safal Gupta Terminal v1.0" },
        { type: "output", text: "Type 'help' to see available commands." },
      ],
    },
  ]);
  const [input, setInput] = useState("");
  const [vaultOpen, setVaultOpen] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const unlockVault = useCallback(() => setVaultOpen(true), []);
  useKonamiCode(unlockVault);

  function submit(cmd: string) {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    const lines = runTerminalCommand(trimmed);
    if (trimmed.toLowerCase() === "future") {
      setVaultOpen(true);
    }

    setHistory((h) => [...h, { input: trimmed, lines }]);
    setInput("");
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    submit(input);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") submit(input);
  }

  return (
    <section id="terminal" className="relative section bg-bg overflow-hidden">
      <TechBackground variant="scan" opacity={0.8} />
      <div className="relative z-10 max-site">
        <ScrollReveal>
          <SectionHeader label="Terminal" title="Interactive terminal" />
        </ScrollReveal>

        <ScrollReveal>
          <div className="glass rounded-2xl overflow-hidden font-mono text-sm">
            <div className="flex items-center gap-2 border-b border-border px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-red-500/80" />
              <span className="h-3 w-3 rounded-full bg-amber-500/80" />
              <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
              <span className="ml-2 text-xs text-muted">safal@portfolio ~</span>
            </div>

            <div className="h-[min(280px,42vh)] md:h-[320px] overflow-y-auto p-4 md:p-6 space-y-4 text-xs md:text-sm">
              {history.map((entry, i) => (
                <div key={i}>
                  {entry.input && (
                    <p className="text-accent">
                      <span className="text-muted">$</span> {entry.input}
                    </p>
                  )}
                  {entry.lines.map((line, j) => (
                    <Line key={j} line={line} />
                  ))}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            <form onSubmit={handleSubmit} className="border-t border-border flex items-center gap-2 p-4">
              <span className="text-muted">$</span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent text-foreground outline-none placeholder:text-muted/50"
                placeholder="whois safal"
                spellCheck={false}
                autoComplete="off"
              />
            </form>
          </div>
        </ScrollReveal>
      </div>

      <Dialog open={vaultOpen} onOpenChange={setVaultOpen}>
        <DialogContent className="max-w-lg">
          <DialogTitle className="text-accent">Future Ideas Vault</DialogTitle>
          <p className="text-sm text-muted mt-2">
            Unlocked. Startup ideas at the intersection of AI and manufacturing.
          </p>
          <div className="mt-6 space-y-4 max-h-[50vh] overflow-y-auto">
            {vault.ideas.map((idea) => (
              <div key={idea.title} className="glass rounded-xl p-4">
                <h4 className="font-medium text-foreground">{idea.title}</h4>
                <p className="mt-2 text-sm text-muted">{idea.description}</p>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}

function Line({ line }: { line: TerminalLine }) {
  if (line.type === "link" && line.href) {
    const isExternal = line.href.startsWith("http");
    if (isExternal) {
      return (
        <a
          href={line.href}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-accent hover:underline pl-2"
        >
          {line.text}
        </a>
      );
    }
    return (
      <Link href={line.href} className="block text-accent hover:underline pl-2">
        {line.text}
      </Link>
    );
  }

  const color =
    line.type === "error"
      ? "text-red-400"
      : line.type === "input"
        ? "text-accent"
        : "text-foreground/80";

  return <p className={`pl-2 ${color}`}>{line.text}</p>;
}
