import type { ReactNode } from "react";
import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils";

type PageShellProps = {
  children: ReactNode;
  className?: string;
  variant?: "default" | "compact" | "wide";
};

const shellClassName: Record<NonNullable<PageShellProps["variant"]>, string> = {
  default: "py-4 md:py-6 lg:py-8",
  compact: "py-3 md:py-5 lg:py-7",
  wide: "py-4 md:py-6 lg:py-8",
};

const containerClassName: Record<NonNullable<PageShellProps["variant"]>, string> = {
  default: "",
  compact: "max-w-5xl",
  wide: "max-w-7xl",
};

export function PageShell({ children, className, variant = "default" }: PageShellProps) {
  return (
    <section className={shellClassName[variant]}>
      <Container className={cn(containerClassName[variant], className)}>{children}</Container>
    </section>
  );
}
