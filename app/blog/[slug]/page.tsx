import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { PostCard } from "@/components/ui/post-card";
import { R2Image } from "@/components/ui/r2-image";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { getRelatedPosts } from "@/lib/posts";
import { isRemoteAssetUrl } from "@/lib/r2";
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
      modifiedTime: post.updatedAt,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post);
  const hasCoverImage = isRemoteAssetUrl(post.coverImage);

  return (
    <Section>
      <Container className="max-w-3xl">
        <Link href="/blog" className="focus-ring rounded-md text-sm font-semibold text-accent hover:underline">
          ← Quay lại Blog
        </Link>
        <div className="mt-8">
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted">
            <time dateTime={post.date}>
              {new Intl.DateTimeFormat("vi-VN", { dateStyle: "long" }).format(new Date(post.date))}
            </time>
            {post.readingTime ? <span>· {post.readingTime}</span> : null}
            <span>· {post.topic}</span>
          </div>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">{post.title}</h1>
          <p className="mt-4 text-lg leading-8 text-muted">{post.description}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-accent/10 px-2.5 py-1 text-xs font-semibold text-accent">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-lg border border-border bg-accent/10">
          {hasCoverImage ? (
            <R2Image
              src={post.coverImage!}
              alt={`${post.title} cover image`}
              fill
              sizes="(min-width: 768px) 768px, 100vw"
              className="object-cover"
              fallbackLabel={post.topic}
              fallbackClassName="text-sm font-semibold text-accent"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm font-semibold text-accent">
              {post.topic}
            </div>
          )}
        </div>

        <article className="prose prose-slate mt-10 max-w-none dark:prose-invert prose-a:text-accent">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </article>

        {relatedPosts.length > 0 ? (
          <div className="mt-16 border-t border-border pt-10">
            <h2 className="text-2xl font-semibold tracking-tight">Bài viết liên quan</h2>
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <PostCard key={relatedPost.slug} post={relatedPost} />
              ))}
            </div>
          </div>
        ) : null}
      </Container>
    </Section>
  );
}
