import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Card } from "@/components/ui/card";
import { getAllPosts } from "@/lib/blog";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Blog - Thuyên Trần",
  description:
    "Bài viết của Thuyên Trần về Next.js, Vercel, Cloudflare R2, frontend development và quá trình xây dựng portfolio cá nhân.",
  path: "/blog",
});

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <Section>
      <Container className="max-w-3xl">
        <p className="text-sm font-semibold text-accent">Blog</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">Bài viết mới</h1>
        <p className="mt-4 leading-7 text-muted">
          Những ghi chú ngắn về quá trình xây dựng website cá nhân, lựa chọn công nghệ và chuẩn bị
          nền tảng cho blog MDX, media storage và các dự án frontend tiếp theo.
        </p>
        <div className="mt-10 space-y-4">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="focus-ring block rounded-lg"
            >
              <Card>
                <p className="text-sm text-muted">
                  {new Intl.DateTimeFormat("vi-VN", { dateStyle: "medium" }).format(new Date(post.date))}
                </p>
                <h2 className="mt-2 text-xl font-semibold">{post.title}</h2>
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
      </Container>
    </Section>
  );
}
