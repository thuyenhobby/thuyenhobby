type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionHeader({ eyebrow, title, description }: SectionHeaderProps) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? <p className="text-sm font-semibold text-accent">{eyebrow}</p> : null}
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">{title}</h1>
      {description ? <p className="mt-4 leading-7 text-muted">{description}</p> : null}
    </div>
  );
}
