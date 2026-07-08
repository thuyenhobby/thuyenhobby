import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
} & ComponentPropsWithoutRef<"button">;

type ButtonLinkProps = {
  children: ReactNode;
  href: string;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
} & Omit<ComponentPropsWithoutRef<"a">, "href" | "className">;

const buttonVariants = {
  primary: "bg-foreground text-background hover:opacity-90",
  secondary: "border border-border hover:border-accent hover:text-accent",
  ghost: "text-muted hover:text-foreground",
};

const baseClassName =
  "focus-ring inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition";

export function Button({ children, variant = "primary", className, ...props }: ButtonProps) {
  return (
    <button className={cn(baseClassName, buttonVariants[variant], className)} {...props}>
      {children}
    </button>
  );
}

export function ButtonLink({ children, href, variant = "primary", className, ...props }: ButtonLinkProps) {
  if (href.startsWith("http") || href.startsWith("mailto:")) {
    return (
      <a
        href={href}
        className={cn(baseClassName, buttonVariants[variant], className)}
        target={props.target ?? (href.startsWith("http") ? "_blank" : undefined)}
        rel={props.rel ?? (href.startsWith("http") ? "noreferrer" : undefined)}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={cn(baseClassName, buttonVariants[variant], className)} {...props}>
      {children}
    </Link>
  );
}
