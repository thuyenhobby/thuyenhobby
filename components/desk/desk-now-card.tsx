import { Tag } from "@/components/ui/tag";
import { deskNow } from "@/lib/desk";

export function DeskNowCard() {
  return (
    <section className="rounded-2xl border border-amber-500/15 bg-amber-50/45 p-3 shadow-sm dark:border-amber-300/15 dark:bg-amber-950/15 md:p-4" aria-label="currently">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="text-base font-semibold tracking-tight">currently</h2>
        <Tag className="bg-amber-500/10 text-amber-800 dark:text-amber-200">now</Tag>
      </div>
      <div className="grid gap-2">
        {deskNow.map((item) => (
          <div key={item} className="rounded-xl border border-amber-900/10 bg-background/70 px-3 py-2 text-sm leading-6 text-muted dark:border-amber-300/10 dark:bg-white/[0.04]">
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}
