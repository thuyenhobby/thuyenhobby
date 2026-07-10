import Link from "next/link";
import { RoomIcon } from "@/components/room/room-icon";
import type { RoomZone } from "@/lib/room";
import { cn } from "@/lib/utils";

type WorkspaceCardProps = {
  zone: RoomZone;
};

const accentClassName: Record<RoomZone["accent"], { card: string; icon: string; glow: string }> = {
  warm: {
    card: "border-amber-500/20 bg-amber-50/60 hover:border-amber-500/45 dark:bg-amber-950/16",
    icon: "bg-amber-500/12 text-amber-800 ring-amber-500/25 dark:text-amber-200",
    glow: "bg-amber-400/35",
  },
  blue: {
    card: "border-cyan-500/20 bg-cyan-50/60 hover:border-cyan-500/45 dark:bg-cyan-950/20",
    icon: "bg-cyan-500/12 text-cyan-800 ring-cyan-500/25 dark:text-cyan-200",
    glow: "bg-cyan-400/35",
  },
  green: {
    card: "border-violet-500/20 bg-violet-50/60 hover:border-violet-500/45 dark:bg-violet-950/18",
    icon: "bg-violet-500/12 text-violet-800 ring-violet-500/25 dark:text-violet-200",
    glow: "bg-violet-400/35",
  },
  purple: {
    card: "border-emerald-500/20 bg-emerald-50/60 hover:border-emerald-500/45 dark:bg-emerald-950/18",
    icon: "bg-emerald-500/12 text-emerald-800 ring-emerald-500/25 dark:text-emerald-200",
    glow: "bg-emerald-400/35",
  },
};

export function WorkspaceCard({ zone }: WorkspaceCardProps) {
  const accent = accentClassName[zone.accent];

  return (
    <Link
      href={zone.href}
      className={cn(
        "focus-ring group relative block min-h-32 overflow-hidden rounded-2xl border p-3 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-soft motion-reduce:hover:translate-y-0 md:p-4",
        accent.card,
      )}
      aria-label={`${zone.title}: ${zone.description}`}
    >
      <span className={cn("absolute -right-8 -top-8 size-20 rounded-full blur-2xl transition group-hover:scale-125", accent.glow)} aria-hidden="true" />
      <article className="relative flex h-full flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <span className={cn("flex size-9 items-center justify-center rounded-xl ring-1 md:size-10", accent.icon)}>
            <RoomIcon name={zone.iconName} className="size-4 md:size-5" />
          </span>
          <span className="rounded-full border border-current/10 bg-background/60 px-2 py-0.5 font-mono text-[10px] font-semibold text-muted dark:bg-white/[0.06]">
            {zone.status}
          </span>
        </div>
        <div className="min-w-0">
          <h2 className="font-mono text-lg font-black tracking-tight md:text-xl">{zone.title}</h2>
          <p className="mt-1 line-clamp-2 text-sm leading-5 text-muted">{zone.description}</p>
        </div>
        <div className="mt-auto flex items-center justify-between gap-3 text-xs font-semibold text-muted">
          <span>{zone.countLabel}</span>
          <span className="text-foreground transition group-hover:translate-x-0.5">open</span>
        </div>
      </article>
    </Link>
  );
}
