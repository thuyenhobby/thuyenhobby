import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type CardShellProps = {
  children: ReactNode;
  className?: string;
};

export function CardShell({ children, className }: CardShellProps) {
  return (
    <article className={cn("rounded-2xl border border-border bg-background p-5 transition hover:border-accent", className)}>
      {children}
    </article>
  );
}
