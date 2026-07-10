import { PageHeading } from "@/components/ui/page-heading";
import { StatPill } from "@/components/ui/stat-pill";

type BookshelfHeaderProps = {
  totalPosts: number;
  featuredPosts: number;
  topicCount: number;
};

export function BookshelfHeader({ totalPosts, featuredPosts, topicCount }: BookshelfHeaderProps) {
  return (
    <PageHeading
      eyebrow="Post"
      title="Post"
      description="longer notes, thoughts, and things my brain decided to keep."
      size="sm"
      compact
      stats={
        <>
          <StatPill label="posts" value={totalPosts} tone="violet" />
          <StatPill label="topics" value={topicCount} tone="violet" />
          <StatPill label="pinned" value={featuredPosts} tone="violet" />
        </>
      }
    />
  );
}
