import Link from "next/link";
import { RoomIcon } from "@/components/room/room-icon";
import { StatusBadge } from "@/components/ui/status-badge";
import type { RoomZone } from "@/lib/room";
import { cn } from "@/lib/utils";

type RoomCardProps = {
  zone: RoomZone;
};

const accentClassName: Record<RoomZone["accent"], { frame: string; icon: string; text: string }> = {
  warm: {
    frame: "border-amber-500/25 bg-amber-500/[0.06] hover:border-amber-500/60",
    icon: "bg-amber-500/12 text-amber-700 ring-amber-500/25 dark:text-amber-300",
    text: "text-amber-700 dark:text-amber-300",
  },
  blue: {
    frame: "border-cyan-500/25 bg-cyan-500/[0.06] hover:border-cyan-500/60",
    icon: "bg-cyan-500/12 text-cyan-700 ring-cyan-500/25 dark:text-cyan-300",
    text: "text-cyan-700 dark:text-cyan-300",
  },
  green: {
    frame: "border-violet-500/25 bg-violet-500/[0.06] hover:border-violet-500/60",
    icon: "bg-violet-500/12 text-violet-700 ring-violet-500/25 dark:text-violet-300",
    text: "text-violet-700 dark:text-violet-300",
  },
  purple: {
    frame: "border-emerald-500/25 bg-emerald-500/[0.06] hover:border-emerald-500/60",
    icon: "bg-emerald-500/12 text-emerald-700 ring-emerald-500/25 dark:text-emerald-300",
    text: "text-emerald-700 dark:text-emerald-300",
  },
};

export function RoomCard({ zone }: RoomCardProps) {
  const accent = accentClassName[zone.accent];

  return (
    <Link
      href={zone.href}
      className={cn(
        "focus-ring group block rounded-2xl border p-4 transition duration-200 hover:-translate-y-1 hover:shadow-soft",
        accent.frame,
      )}
    >
      <article className="flex h-full flex-col gap-4">
        <div className="flex items-center justify-between gap-3">
          <span className={cn("flex size-11 items-center justify-center rounded-xl ring-1", accent.icon)}>
            <RoomIcon name={zone.iconName} className="size-5" />
          </span>
          {zone.status ? <StatusBadge className="bg-background/60">{zone.status}</StatusBadge> : null}
        </div>
        <div>
          <h2 className="text-lg font-semibold tracking-tight">{zone.title}</h2>
          <p className="mt-2 text-sm leading-6 text-muted">{zone.description}</p>
        </div>
        <div className="mt-auto flex items-center justify-between gap-4 text-sm font-semibold">
          <span className="text-muted">{zone.countLabel}</span>
          <span className={accent.text}>Mở</span>
        </div>
      </article>
    </Link>
  );
}
