import Link from "next/link";
import { RoomIcon } from "@/components/room/room-icon";
import { roomZones, type RoomZone } from "@/lib/room";
import { cn } from "@/lib/utils";

type ZoneNextLinksProps = {
  current: RoomZone["id"];
  title?: string;
};

const accentClassName: Record<RoomZone["accent"], string> = {
  warm: "hover:border-amber-500/45 hover:text-amber-700 dark:hover:text-amber-300",
  blue: "hover:border-cyan-500/45 hover:text-cyan-700 dark:hover:text-cyan-300",
  green: "hover:border-violet-500/45 hover:text-violet-700 dark:hover:text-violet-300",
  purple: "hover:border-emerald-500/45 hover:text-emerald-700 dark:hover:text-emerald-300",
};

export function ZoneNextLinks({ current, title = "next stop" }: ZoneNextLinksProps) {
  const links = roomZones.filter((zone) => zone.id !== current);

  return (
    <section className="mt-5 rounded-2xl border border-border bg-background/70 p-3 shadow-sm dark:bg-white/[0.03] md:mt-6 md:p-4" aria-labelledby="zone-next-links">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 id="zone-next-links" className="text-sm font-semibold tracking-tight text-foreground md:text-base">
          {title}
        </h2>
        <Link href="/" className="focus-ring rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-muted transition hover:border-cyan-500/45 hover:text-foreground">
          Workspace
        </Link>
      </div>
      <div className="mt-3 grid gap-2 sm:grid-cols-3">
        {links.map((zone) => (
          <Link
            key={zone.id}
            href={zone.href}
            className={cn(
              "focus-ring flex min-h-12 items-center gap-3 rounded-xl border border-border bg-foreground/[0.02] px-3 py-2 text-sm font-semibold text-muted transition hover:-translate-y-0.5 hover:bg-background",
              accentClassName[zone.accent],
            )}
          >
            <RoomIcon name={zone.iconName} className="size-4 shrink-0" />
            <span className="min-w-0">
              <span className="block truncate text-foreground">{zone.title}</span>
              <span className="block truncate text-xs font-medium text-muted">{zone.label}</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
