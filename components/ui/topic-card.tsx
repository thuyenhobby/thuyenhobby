import Link from "next/link";
import { Card } from "@/components/ui/card";
import type { Topic } from "@/types/topic";

type TopicCardProps = {
  topic: Topic;
};

export function TopicCard({ topic }: TopicCardProps) {
  return (
    <Link href={`/topics/${topic.slug}`} className="focus-ring block rounded-lg">
      <Card className="h-full">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-lg font-semibold">{topic.name}</h3>
          <span className="rounded-full bg-accent/10 px-2.5 py-1 text-xs font-semibold text-accent">
            {topic.count ?? 0} bài
          </span>
        </div>
        <p className="mt-3 text-sm leading-6 text-muted">{topic.description}</p>
      </Card>
    </Link>
  );
}
