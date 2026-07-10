import { RoomIcon } from "@/components/room/room-icon";
import { deskProfile } from "@/lib/desk";

export function DeskProfileCard() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-cyan-700/15 bg-cyan-50/45 p-3 shadow-sm dark:border-cyan-300/15 dark:bg-slate-950 md:p-4" aria-label="Profile">
      <div className="absolute right-4 top-4 h-16 w-20 rounded-xl border border-cyan-700/10 bg-background/60 dark:border-cyan-300/10 dark:bg-white/[0.04]" aria-hidden="true">
        <div className="mx-3 mt-4 h-1.5 rounded-full bg-cyan-500/30" />
        <div className="mx-3 mt-2 h-1.5 w-2/3 rounded-full bg-emerald-500/25" />
      </div>
      <div className="flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-700 ring-1 ring-cyan-500/20 dark:text-cyan-300">
          <RoomIcon name="monitor" className="size-5" />
        </span>
        <div>
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">identity card</p>
          <h1 className="mt-1 text-xl font-semibold tracking-tight md:text-2xl">{deskProfile.name}</h1>
        </div>
      </div>
      <p className="mt-3 text-sm font-semibold text-foreground">{deskProfile.role}</p>
      <p className="mt-2 max-w-xl text-sm leading-6 text-muted">{deskProfile.note}</p>
    </section>
  );
}
