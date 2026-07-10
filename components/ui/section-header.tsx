import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
  compact?: boolean;
};

export function SectionHeader({ eyebrow, title, description, action, className, compact = true }: SectionHeaderProps) {
  return (
    <div className={cn("mb-3 flex items-end justify-between gap-4 md:mb-4", className)}>
      <div className="min-w-0">
        {eyebrow ? <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-muted">{eyebrow}</p> : null}
        <h2 className={cn("font-semibold tracking-tight", compact ? "text-lg md:text-xl" : "text-xl md:text-2xl")}>{title}</h2>
        {description ? <p className="mt-1 max-w-2xl text-sm leading-6 text-muted">{description}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
