import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {
  src?: string | null;
  alt: string;
  gradient: string;
  className?: string;
  priority?: boolean;
};

export function ProjectCover({ src, alt, gradient, className, priority }: Props) {
  if (src) {
    return (
      <div className={cn("relative overflow-hidden rounded-xl", className)}>
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 800px"
          priority={priority}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg/60 to-transparent" />
      </div>
    );
  }

  return (
    <div
      className={cn("rounded-xl bg-gradient-to-br", gradient, className)}
      role="img"
      aria-label={alt}
    />
  );
}
