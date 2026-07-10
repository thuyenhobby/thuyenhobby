import type { PersonalTool } from "@/lib/tools";
import { cn } from "@/lib/utils";

type ToolStatusBadgeProps = {
  status: PersonalTool["status"];
};

const statusConfig: Record<PersonalTool["status"], { label: string; className: string }> = {
  available: {
    label: "ready",
    className: "bg-emerald-500/10 text-emerald-700 ring-emerald-500/25 dark:text-emerald-300",
  },
  building: {
    label: "cooking",
    className: "bg-cyan-500/10 text-cyan-700 ring-cyan-500/25 dark:text-cyan-300",
  },
  idea: {
    label: "idea",
    className: "bg-slate-500/10 text-slate-700 ring-slate-500/25 dark:text-slate-300",
  },
  paused: {
    label: "archived",
    className: "bg-amber-500/10 text-amber-700 ring-amber-500/25 dark:text-amber-300",
  },
};

export function ToolStatusBadge({ status }: ToolStatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-bold ring-1 md:px-2.5 md:py-1 md:text-xs", config.className)}>
      <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />
      {config.label}
    </span>
  );
}
