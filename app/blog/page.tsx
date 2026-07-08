import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Bai viet ve web development, product, SEO va performance.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <Section>
      <Container className="max-w-3xl">
        <p className="text-sm font-semibold text-accent">Blog</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">Bai viet moi</h1>
        <div className="mt-10 space-y-4">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="focus-ring block rounded-lg border border-border p-5 transition hover:border-accent"
            >
              <p className="text-sm text-muted">
                {new Intl.DateTimeFormat("vi-VN", { dateStyle: "medium" }).format(new Date(post.date))}
              </p>
              <h2 className="mt-2 text-xl font-semibold">{post.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted">{post.description}</p>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
