import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type CardShellVariant = "default" | "room" | "resource" | "book" | "tool";
type CardShellDensity = "compact" | "default";

type CardShellProps<TElement extends ElementType = "article"> = {
  as?: TElement;
  children: ReactNode;
  className?: string;
  variant?: CardShellVariant;
  density?: CardShellDensity;
} & Omit<ComponentPropsWithoutRef<TElement>, "as" | "children" | "className">;

const variantClassName: Record<CardShellVariant, string> = {
  default: "border-border bg-background hover:border-accent",
  room: "border-cyan-700/15 bg-cyan-500/[0.04] hover:border-cyan-500/45 dark:border-cyan-300/15",
  resource: "border-amber-900/15 bg-amber-50/55 hover:border-amber-500/45 dark:border-amber-300/15 dark:bg-amber-950/20",
  book: "border-violet-500/18 bg-violet-500/[0.04] hover:border-violet-500/45",
  tool: "border-cyan-700/15 bg-cyan-50/45 hover:border-cyan-500/45 dark:border-cyan-500/16 dark:bg-slate-950",
};

const densityClassName: Record<CardShellDensity, string> = {
  compact: "rounded-2xl p-3 shadow-sm md:p-4",
  default: "rounded-2xl p-4 shadow-sm md:p-5",
};

export function CardShell<TElement extends ElementType = "article">({
  as,
  children,
  className,
  variant = "default",
  density = "default",
  ...props
}: CardShellProps<TElement>) {
  const Component = as ?? "article";

  return (
    <Component
      className={cn(
        "border transition duration-200",
        variantClassName[variant],
        densityClassName[density],
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
