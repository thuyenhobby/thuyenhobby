import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className }: CardProps) {
  return (
    <article className={cn("rounded-lg border border-border bg-background p-5 transition hover:border-accent", className)}>
      {children}
    </article>
  );
}
