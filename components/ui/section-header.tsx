type Props = {
  label: string;
  title: string;
  description?: string;
};

export function SectionHeader({ label, title, description }: Props) {
  return (
    <div className="mb-12 md:mb-16">
      <p className="label mb-3">{label}</p>
      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">{title}</h2>
      {description && <p className="mt-4 max-w-xl text-muted leading-relaxed">{description}</p>}
    </div>
  );
}
