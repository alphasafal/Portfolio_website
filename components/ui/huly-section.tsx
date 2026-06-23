import { cn } from "@/lib/utils";

type Props = {
  id?: string;
  children: React.ReactNode;
  className?: string;
  dotGrid?: boolean;
};

export function HulySection({ id, children, className, dotGrid = true }: Props) {
  return (
    <section
      id={id}
      className={cn(
        "huly-section relative section overflow-hidden",
        dotGrid && "huly-dot-grid",
        className
      )}
    >
      {children}
    </section>
  );
}

type HeaderProps = {
  label: string;
  title: string;
  description?: string;
  className?: string;
};

export function HulySectionHeader({ label, title, description, className }: HeaderProps) {
  return (
    <div className={cn("mb-12 md:mb-16", className)}>
      <p className="huly-label mb-3">{label}</p>
      <h2 className="huly-title text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-4 max-w-2xl huly-muted text-lg leading-relaxed">{description}</p>
      )}
    </div>
  );
}
