import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { siteConfig } from "@/lib/site";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${siteConfig.url}/blog/${post.slug}`,
      siteName: siteConfig.name,
      locale: "vi_VN",
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <Section>
      <Container className="max-w-3xl">
        <p className="text-sm text-muted">
          {new Intl.DateTimeFormat("vi-VN", { dateStyle: "long" }).format(new Date(post.date))}
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">{post.title}</h1>
        <p className="mt-4 text-lg leading-8 text-muted">{post.description}</p>
        <article className="prose prose-slate mt-10 max-w-none dark:prose-invert prose-a:text-accent">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </article>
      </Container>
    </Section>
  );
}
