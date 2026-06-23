import { SITE } from "@/lib/constants";
import { getAllProjects } from "@/lib/projects";
import { getAllEssays } from "@/lib/writing";
import skills from "@/content/skills.json";

export type TerminalLine = {
  type: "input" | "output" | "error" | "link";
  text: string;
  href?: string;
};

export function runTerminalCommand(input: string): TerminalLine[] {
  const cmd = input.trim().toLowerCase();

  if (!cmd) return [];

  if (cmd === "whois safal" || cmd === "whois") {
    return [
      { type: "output", text: SITE.oneLiner },
      { type: "output", text: "Computer Science Engineer · AI Builder · Future Founder" },
    ];
  }

  if (cmd === "projects") {
    const projects = getAllProjects();
    return [
      { type: "output", text: `${projects.length} featured projects:` },
      ...projects.map((p) => ({
        type: "link" as const,
        text: `→ ${p.title}`,
        href: `/projects/${p.slug}`,
      })),
    ];
  }

  if (cmd === "skills") {
    return skills.categories.flatMap((cat) => [
      { type: "output" as const, text: `[${cat.name}]` },
      { type: "output" as const, text: cat.skills.join(", ") },
    ]);
  }

  if (cmd === "resume") {
    return [
      {
        type: "link",
        text: "Download résumé → /resume-safal-gupta.pdf",
        href: "/resume-safal-gupta.pdf",
      },
    ];
  }

  if (cmd === "contact") {
    return [
      { type: "output", text: `Email: ${SITE.email}` },
      { type: "link", text: `LinkedIn: ${SITE.social.linkedin}`, href: SITE.social.linkedin },
      { type: "link", text: `GitHub: ${SITE.social.github}`, href: SITE.social.github },
    ];
  }

  if (cmd === "future") {
    return [
      {
        type: "output",
        text: "Building a billion-dollar manufacturing technology company.",
      },
    ];
  }

  if (cmd === "jcb" || cmd === "internship") {
    return [
      { type: "output", text: "JCB India — Industrial Digitalization Intern (2026)" },
      { type: "output", text: "Process automation · Manufacturing systems · Power Platform" },
      {
        type: "link",
        text: "→ Read JCB case study",
        href: "/projects/jcb-digitalization",
      },
    ];
  }

  if (cmd === "writing" || cmd === "essays") {
    const essays = getAllEssays();
    return [
      { type: "output", text: `${essays.length} essays:` },
      ...essays.map((e) => ({
        type: "link" as const,
        text: `→ ${e.title}`,
        href: `/writing/${e.slug}`,
      })),
    ];
  }

  if (cmd === "help") {
    return [
      { type: "output", text: "Available commands:" },
      {
        type: "output",
        text: "whois safal · projects · writing · skills · resume · contact · jcb · help",
      },
      { type: "output", text: "Try typing 'future'..." },
    ];
  }

  return [{ type: "error", text: `Command not found: ${input}. Type 'help' for commands.` }];
}
