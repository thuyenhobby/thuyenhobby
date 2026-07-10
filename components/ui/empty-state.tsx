type EmptyStateProps = {
  title: string;
  description: string;
};

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="rounded-2xl border border-dashed border-border p-4 text-center md:p-6">
      <h2 className="text-base font-semibold md:text-lg">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-muted">{description}</p>
    </div>
  );
}
