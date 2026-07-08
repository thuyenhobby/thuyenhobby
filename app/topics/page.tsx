import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { TopicCard } from "@/components/ui/topic-card";
import { createPageMetadata } from "@/lib/metadata";
import { getAllTopics } from "@/lib/topics";

export const metadata = createPageMetadata({
  title: "Topics",
  description: "Các chủ đề chính trên blog: Next.js, frontend, deployment, Cloudflare, GitHub và learning notes.",
  path: "/topics",
});

export default function TopicsPage() {
  const topics = getAllTopics();

  return (
    <Section>
      <Container>
        <div className="max-w-3xl">
          <p className="text-sm font-semibold text-accent">Topics</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight">Chủ đề bài viết</h1>
          <p className="mt-4 leading-7 text-muted">
            Duyệt bài viết theo nhóm nội dung để dễ theo dõi quá trình học và xây sản phẩm web.
          </p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic) => (
            <TopicCard key={topic.slug} topic={topic} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
