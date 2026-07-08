import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type BadgeProps = {
  children: ReactNode;
  className?: string;
};

export function Badge({ children, className }: BadgeProps) {
  return (
    <span className={cn("rounded-full border border-border px-2.5 py-1 text-xs font-medium text-muted", className)}>
      {children}
    </span>
  );
}
