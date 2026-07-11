import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleShell } from "@/components/bookshelf/article-shell";
import { BookshelfMdxContent } from "@/components/bookshelf/mdx-components";
import { PageShell } from "@/components/ui/page-shell";
import { getBookshelfPostBySlug, getRelatedBookshelfPosts } from "@/lib/bookshelf-r2";
import { getShelfPostBySlug } from "@/lib/bookshelf";
import { siteConfig } from "@/lib/site";
import type { BookshelfPostMetadata } from "@/types/bookshelf";

export const revalidate = 60;
export const dynamic = "force-dynamic";

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

async function getPost(slug: string) {
  try {
    return await getBookshelfPostBySlug(slug);
  } catch {
    return getShelfPostBySlug(slug) ?? null;
  }
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    alternates: {
      canonical: `/post/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${siteConfig.url}/post/${post.slug}`,
      siteName: siteConfig.name,
      locale: "vi_VN",
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updatedAt,
      tags: post.tags,
      images: post.coverImage ? [{ url: post.coverImage }] : undefined,
    },
  };
}

export default async function PostDetailPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  let relatedPosts: BookshelfPostMetadata[] = [];
  try {
    relatedPosts = await getRelatedBookshelfPosts(slug, 5);
  } catch {
    relatedPosts = [];
  }

  return (
    <PageShell variant="wide">
      <ArticleShell post={post} relatedPosts={relatedPosts}>
        <BookshelfMdxContent content={post.content} />
      </ArticleShell>
    </PageShell>
  );
}
