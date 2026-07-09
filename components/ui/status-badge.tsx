import { cn } from "@/lib/utils";

type StatusBadgeProps = {
  children: string;
  className?: string;
};

export function StatusBadge({ children, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 text-xs font-semibold text-muted",
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
      {children}
    </span>
  );
}
