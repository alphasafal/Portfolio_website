import { SITE } from "@/lib/constants";
import { GithubIcon, LinkedinIcon, XIcon } from "@/components/ui/icons";

const LINKS = [
  { href: SITE.social.github, label: "GitHub", icon: GithubIcon },
  { href: SITE.social.linkedin, label: "LinkedIn", icon: LinkedinIcon },
  { href: SITE.social.x, label: "X", icon: XIcon },
] as const;

export function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {LINKS.map(({ href, label, icon: Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition hover:border-accent hover:text-accent"
        >
          <Icon className="h-4 w-4" />
        </a>
      ))}
    </div>
  );
}
