import { cn } from "@/lib/utils";

type StatPillProps = {
  label: string;
  value: string | number;
  tone?: "default" | "cyan" | "amber" | "violet" | "emerald";
};

const toneClassName: Record<NonNullable<StatPillProps["tone"]>, string> = {
  default: "border-border bg-foreground/[0.03] text-foreground",
  cyan: "border-cyan-500/20 bg-cyan-500/10 text-cyan-800 dark:text-cyan-200",
  amber: "border-amber-500/20 bg-amber-500/10 text-amber-900 dark:text-amber-200",
  violet: "border-violet-500/20 bg-violet-500/10 text-violet-800 dark:text-violet-200",
  emerald: "border-emerald-500/20 bg-emerald-500/10 text-emerald-800 dark:text-emerald-200",
};

export function StatPill({ label, value, tone = "default" }: StatPillProps) {
  return (
    <span className={cn("inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-xs font-semibold", toneClassName[tone])}>
      <span className="font-mono">{value}</span>
      <span className="text-current/70">{label}</span>
    </span>
  );
}
