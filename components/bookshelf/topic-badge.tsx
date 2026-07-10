import { cn } from "@/lib/utils";

type TopicBadgeProps = {
  topic: string;
  className?: string;
};

export function TopicBadge({ topic, className }: TopicBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-violet-500/10 px-2.5 py-1 text-xs font-bold text-violet-700 ring-1 ring-violet-500/15 dark:text-violet-300",
        className,
      )}
    >
      {topic}
    </span>
  );
}
