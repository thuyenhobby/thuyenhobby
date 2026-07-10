import { deskTimeline } from "@/lib/desk";

export function DeskTimeline() {
  return (
    <section className="rounded-2xl border border-violet-500/15 bg-violet-500/[0.04] p-3 shadow-sm md:p-4" aria-label="log">
      <h2 className="text-base font-semibold tracking-tight">small log</h2>
      <div className="mt-3 space-y-3">
        {deskTimeline.map((item) => (
          <article key={`${item.date}-${item.title}`} className="grid grid-cols-[4.5rem_1fr] gap-3 rounded-xl bg-background/75 p-3 dark:bg-white/[0.04]">
            <time className="font-mono text-xs font-bold text-violet-700 dark:text-violet-300">{item.date}</time>
            <div>
              <h3 className="text-sm font-semibold">{item.title}</h3>
              <p className="mt-1 text-sm leading-6 text-muted">{item.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
