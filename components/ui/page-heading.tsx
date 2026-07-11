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

export function PageHeading({ title, action, meta, stats, className, compact = false, size = "md" }: PageHeadingProps) {
  return (
    <div className={cn("mb-4 flex flex-col gap-3 sm:mb-5 sm:flex-row sm:items-center sm:justify-between", compact && "mb-3 sm:mb-4", className)}>
      <div className="min-w-0">
        <h1 className={cn("font-semibold tracking-tight", size === "sm" ? "text-2xl md:text-3xl" : "text-3xl lg:text-4xl")}>{title}</h1>
        {stats ? <div className="mt-2 flex flex-wrap gap-2">{stats}</div> : null}
        {meta ? <div className="mt-2">{meta}</div> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
