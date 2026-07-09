import type { ReactNode } from "react";
import { Container } from "@/components/layout/container";

type PageShellProps = {
  children: ReactNode;
  className?: string;
};

export function PageShell({ children, className }: PageShellProps) {
  return (
    <section className="py-8 sm:py-10">
      <Container className={className}>{children}</Container>
    </section>
  );
}
