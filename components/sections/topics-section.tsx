import Link from "next/link";
import { Section } from "@/components/layout/section";
import { TopicCard } from "@/components/ui/topic-card";
import type { Topic } from "@/types/topic";

type TopicsSectionProps = {
  topics: Topic[];
};

export function TopicsSection({ topics }: TopicsSectionProps) {
  return (
    <Section>
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="text-sm font-semibold text-accent">Topics</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight">Chủ đề nổi bật</h2>
        </div>
        <Link href="/topics" className="focus-ring rounded-md text-sm font-semibold text-accent hover:underline">
          Xem chủ đề
        </Link>
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {topics.map((topic) => (
          <TopicCard key={topic.slug} topic={topic} />
        ))}
      </div>
    </Section>
  );
}
