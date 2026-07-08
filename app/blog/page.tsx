import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { PostCard } from "@/components/ui/post-card";
import { getAllPosts } from "@/lib/blog";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Blog",
  description:
    "Danh sách bài viết về Next.js, frontend, deployment, Cloudflare R2, GitHub và hành trình học lập trình web.",
  path: "/blog",
});

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <Section>
      <Container>
        <div className="max-w-3xl">
          <p className="text-sm font-semibold text-accent">Blog</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight">Bài viết mới</h1>
          <p className="mt-4 leading-7 text-muted">
            Các ghi chú thực tế về học lập trình web, xây blog cá nhân, triển khai với Vercel và
            dùng Cloudflare R2 để quản lý ảnh/file public.
          </p>
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
