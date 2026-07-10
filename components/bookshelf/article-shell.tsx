import Image from "next/image";
import type { ReactNode } from "react";
import { BookMeta } from "@/components/bookshelf/book-meta";
import { RelatedBooks } from "@/components/bookshelf/related-books";
import { TopicBadge } from "@/components/bookshelf/topic-badge";
import { RoomTrail } from "@/components/room/room-trail";
import { Tag } from "@/components/ui/tag";
import type { BookshelfPost, BookshelfPostMetadata } from "@/types/bookshelf";

type ArticleShellProps = {
  post: BookshelfPost;
  relatedPosts: BookshelfPostMetadata[];
  children: ReactNode;
};

function ArticleCover({ post }: { post: BookshelfPost }) {
  if (post.coverImage) {
    return (
      <div className="relative h-32 overflow-hidden rounded-2xl border border-violet-500/20 bg-violet-500/10 md:h-full md:min-h-44">
        <Image src={post.coverImage} alt="" fill sizes="(min-width: 768px) 220px, 100vw" className="object-cover" priority />
      </div>
    );
  }

  return (
    <div className="relative h-24 overflow-hidden rounded-2xl border border-violet-500/20 bg-[linear-gradient(135deg,rgba(255,251,235,0.88),rgba(167,139,250,0.2))] dark:bg-[linear-gradient(135deg,rgba(30,41,59,0.88),rgba(167,139,250,0.2))] md:h-full md:min-h-44" aria-hidden="true">
      <div className="absolute inset-y-3 left-1/2 w-px bg-violet-500/20" />
      <div className="absolute left-5 top-5 h-2 w-24 rounded-full bg-violet-500/25" />
      <div className="absolute left-5 top-10 h-2 w-36 rounded-full bg-amber-500/20" />
      <div className="absolute bottom-5 right-5 h-14 w-11 -rotate-6 rounded-xl border border-violet-500/20 bg-violet-500/15" />
    </div>
  );
}

export function ArticleShell({ post, relatedPosts, children }: ArticleShellProps) {
  return (
    <div className="mx-auto w-full max-w-4xl">
      <RoomTrail items={[{ label: "Workspace", href: "/" }, { label: "Post", href: "/bookshelf" }, { label: post.title }]} />

      <article className="mt-4 overflow-hidden rounded-[1.5rem] border border-violet-500/15 bg-background shadow-sm dark:bg-slate-950/45 md:mt-5">
        <header className="grid gap-4 border-b border-border bg-[linear-gradient(180deg,rgba(139,92,246,0.08),transparent)] p-4 md:grid-cols-[1fr_13rem] md:p-5">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <TopicBadge topic={post.topic} />
              <BookMeta post={post} showUpdated />
            </div>
            <h1 className="mt-3 text-2xl font-semibold tracking-tight md:text-4xl">{post.title}</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted md:text-base md:leading-7">{post.description}</p>
            {post.tags.length > 0 ? (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {post.tags.slice(0, 5).map((tag) => (
                  <Tag key={tag} className="bg-violet-500/10 text-violet-700 dark:text-violet-300">{tag}</Tag>
                ))}
              </div>
            ) : null}
          </div>
          <ArticleCover post={post} />
        </header>

        <div className="px-4 pb-5 md:px-6 md:pb-7">
          {children}
        </div>
      </article>

      <RelatedBooks posts={relatedPosts} />
    </div>
  );
}
