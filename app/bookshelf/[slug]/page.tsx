import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookshelfGrid } from "@/components/bookshelf/bookshelf-grid";
import { BookshelfMdxContent } from "@/components/bookshelf/mdx-components";
import { PageShell } from "@/components/ui/page-shell";
import { Tag } from "@/components/ui/tag";
import { getBookshelfPostBySlug, getRelatedBookshelfPosts } from "@/lib/bookshelf-r2";
import { getShelfPostBySlug } from "@/lib/bookshelf";
import { siteConfig } from "@/lib/site";
import type { BookshelfPostMetadata } from "@/types/bookshelf";

export const revalidate = 60;

type BookshelfPostPageProps = {
  params: Promise<{ slug: string }>;
};

async function getPost(slug: string) {
  try {
    return await getBookshelfPostBySlug(slug);
  } catch {
    return getShelfPostBySlug(slug) ?? null;
  }
}

export async function generateMetadata({ params }: BookshelfPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `/bookshelf/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${siteConfig.url}/bookshelf/${post.slug}`,
      siteName: siteConfig.name,
      locale: "vi_VN",
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updatedAt,
      images: post.coverImage ? [{ url: post.coverImage }] : undefined,
    },
  };
}

export default async function BookshelfPostPage({ params }: BookshelfPostPageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  let relatedPosts: BookshelfPostMetadata[] = [];
  try {
    relatedPosts = await getRelatedBookshelfPosts(slug, 3);
  } catch {
    relatedPosts = [];
  }

  return (
    <PageShell className="max-w-3xl">
      <Link href="/bookshelf" className="focus-ring rounded-md text-sm font-semibold text-accent hover:underline">
        ← Quay lại Giá sách
      </Link>
      <article className="mt-8">
        <p className="text-sm font-semibold text-accent">{post.topic}</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">{post.title}</h1>
        <p className="mt-4 text-lg leading-8 text-muted">{post.description}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
        {post.coverImage ? (
          <img src={post.coverImage} alt={post.title} className="mt-8 h-auto w-full rounded-3xl border border-border object-cover" />
        ) : null}
        <BookshelfMdxContent content={post.content} />
      </article>

      {relatedPosts.length > 0 ? (
        <section className="mt-12">
          <h2 className="mb-5 text-2xl font-semibold tracking-tight">Có thể đọc tiếp</h2>
          <BookshelfGrid posts={relatedPosts} />
        </section>
      ) : null}
    </PageShell>
  );
}
