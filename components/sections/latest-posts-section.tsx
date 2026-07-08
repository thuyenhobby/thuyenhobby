import { Section } from "@/components/layout/section";
import { PostCard } from "@/components/ui/post-card";
import type { BlogPost } from "@/types/blog";

type LatestPostsSectionProps = {
  posts: BlogPost[];
};

export function LatestPostsSection({ posts }: LatestPostsSectionProps) {
  return (
    <Section>
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-sm font-semibold text-accent">Writing</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight">Latest Blog Posts</h2>
          <p className="mt-4 leading-7 text-muted">
            Một vài ghi chú ngắn về cách tôi xây dựng website cá nhân, deploy và chuẩn bị hạ tầng
            nội dung cho giai đoạn tiếp theo.
          </p>
        </div>
        <div className="space-y-4">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </Section>
  );
}
