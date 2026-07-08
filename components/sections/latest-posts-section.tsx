import Link from "next/link";
import { Section } from "@/components/layout/section";
import { Card } from "@/components/ui/card";
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
            <Link key={post.slug} href={`/blog/${post.slug}`} className="focus-ring block rounded-lg">
              <Card>
                <p className="text-sm text-muted">
                  {new Intl.DateTimeFormat("vi-VN", { dateStyle: "medium" }).format(new Date(post.date))}
                </p>
                <h3 className="mt-2 text-lg font-semibold">{post.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{post.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-accent/10 px-2.5 py-1 text-xs font-semibold text-accent">
                      {tag}
                    </span>
                  ))}
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </Section>
  );
}
