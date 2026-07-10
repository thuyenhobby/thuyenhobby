import { deskStack } from "@/lib/desk";

export function DeskStackCard() {
  return (
    <section className="rounded-2xl border border-border bg-background p-3 shadow-sm md:p-4" aria-label="Tech stack">
      <h2 className="text-base font-semibold tracking-tight">Stack</h2>
      <div className="mt-3 grid gap-3">
        {Object.entries(deskStack).map(([group, items]) => (
          <div key={group}>
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-muted">{group}</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {items.map((item) => (
                <span key={item} className="rounded-md bg-cyan-500/10 px-2 py-1 text-xs font-semibold text-cyan-800 dark:text-cyan-200">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
