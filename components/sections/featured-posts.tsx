import Link from "next/link";
import { Section } from "@/components/layout/section";
import { PostCard } from "@/components/ui/post-card";
import type { BlogPost } from "@/types/blog";

type FeaturedPostsProps = {
  posts: BlogPost[];
};

export function FeaturedPosts({ posts }: FeaturedPostsProps) {
  return (
    <Section>
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="text-sm font-semibold text-accent">Latest</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight">Bài viết mới nhất</h2>
        </div>
        <Link href="/blog" className="focus-ring rounded-md text-sm font-semibold text-accent hover:underline">
          Tất cả bài viết
        </Link>
      </div>
      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </Section>
  );
}
