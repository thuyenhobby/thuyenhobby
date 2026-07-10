import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type PageHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  meta?: ReactNode;
  stats?: ReactNode;
  className?: string;
  compact?: boolean;
  size?: "sm" | "md";
};

export function PageHeading({ eyebrow, title, description, action, meta, stats, className, compact = false, size = "md" }: PageHeadingProps) {
  return (
    <div className={cn("mb-4 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-end sm:justify-between", compact && "mb-3 sm:mb-4", className)}>
      <div className="min-w-0">
        {eyebrow ? (
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-muted">{eyebrow}</p>
        ) : null}
        <h1 className={cn("mt-1.5 font-semibold tracking-tight", size === "sm" ? "text-xl sm:text-2xl" : "text-2xl sm:text-3xl lg:text-4xl")}>{title}</h1>
        {description ? <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">{description}</p> : null}
        {stats ? <div className="mt-3 flex flex-wrap gap-2">{stats}</div> : null}
        {meta ? <div className="mt-3">{meta}</div> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
