import { cn } from "@/lib/utils";

type TagProps = {
  children: string;
  className?: string;
};

export function Tag({ children, className }: TagProps) {
  return (
    <span className={cn("rounded-full bg-accent/10 px-2.5 py-1 text-xs font-semibold text-accent", className)}>
      {children}
    </span>
  );
}
