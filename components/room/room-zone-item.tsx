import Link from "next/link";
import { RoomIcon } from "@/components/room/room-icon";
import { StatusBadge } from "@/components/ui/status-badge";
import type { RoomZone } from "@/lib/room";
import { cn } from "@/lib/utils";

type RoomZoneItemProps = {
  zone: RoomZone;
};

const zoneClassName: Record<RoomZone["accent"], string> = {
  warm:
    "border-amber-700/20 bg-amber-50/88 text-amber-950 hover:border-amber-600/45 dark:border-amber-300/35 dark:bg-amber-950/62 dark:text-amber-100 dark:hover:border-amber-300/70",
  blue:
    "border-cyan-700/20 bg-cyan-50/88 text-cyan-950 hover:border-cyan-600/45 dark:border-cyan-300/35 dark:bg-cyan-950/62 dark:text-cyan-100 dark:hover:border-cyan-300/70",
  green:
    "border-violet-700/20 bg-violet-50/88 text-violet-950 hover:border-violet-600/45 dark:border-violet-300/35 dark:bg-violet-950/62 dark:text-violet-100 dark:hover:border-violet-300/70",
  purple:
    "border-emerald-700/20 bg-emerald-50/88 text-emerald-950 hover:border-emerald-600/45 dark:border-emerald-300/35 dark:bg-emerald-950/62 dark:text-emerald-100 dark:hover:border-emerald-300/70",
};

export function RoomZoneItem({ zone }: RoomZoneItemProps) {
  const position = zone.position.desktop;

  return (
    <Link
      href={zone.href}
      aria-label={`${zone.title}: ${zone.description}`}
      className={cn(
        "focus-ring group absolute hidden -translate-x-1/2 -translate-y-1/2 rounded-2xl border p-3 shadow-soft backdrop-blur transition duration-200 hover:-translate-y-[calc(50%+4px)] hover:shadow-lg md:block",
        zoneClassName[zone.accent],
      )}
      style={{ left: `${position.x}%`, top: `${position.y}%` }}
    >
      <div className="flex items-center gap-3">
        <span className="flex size-12 items-center justify-center rounded-xl bg-background/60 text-current ring-1 ring-current/15 transition group-hover:ring-current/30 dark:bg-white/10">
          <RoomIcon name={zone.iconName} className="size-6" />
        </span>
        <span>
          <span className="block text-sm font-semibold text-current">{zone.title}</span>
          <span className="block text-xs text-current/65">{zone.label}</span>
        </span>
      </div>
      <div className="pointer-events-none absolute left-1/2 top-[calc(100%+10px)] z-20 w-60 -translate-x-1/2 rounded-xl border border-border bg-background p-3 text-sm leading-6 text-muted opacity-0 shadow-soft transition group-hover:opacity-100 group-focus-visible:opacity-100">
        <div className="mb-2 flex items-center justify-between gap-3">
          <span className="font-semibold text-foreground">{zone.title}</span>
          {zone.status ? <StatusBadge>{zone.status}</StatusBadge> : null}
        </div>
        {zone.description}
      </div>
    </Link>
  );
}
