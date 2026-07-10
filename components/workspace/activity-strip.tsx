import { Tag } from "@/components/ui/tag";

type ActivityItem = {
  label: string;
  value: string;
};

type ActivityStripProps = {
  items: ActivityItem[];
};

export function ActivityStrip({ items }: ActivityStripProps) {
  return (
    <section className="rounded-2xl border border-border bg-background/70 p-3 shadow-sm dark:bg-white/[0.03] md:p-4" aria-label="Recent activity">
      <div className="grid gap-2 text-sm md:grid-cols-4">
        {items.map((item) => (
          <div key={item.label} className="min-w-0 rounded-xl border border-border/70 bg-foreground/[0.02] px-3 py-2 dark:bg-white/[0.03]">
            <Tag className="bg-cyan-500/10 text-cyan-700 dark:text-cyan-300">{item.label}</Tag>
            <p className="mt-2 truncate text-sm font-semibold text-foreground">{item.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
