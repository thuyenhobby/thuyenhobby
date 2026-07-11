import Image from "next/image";
import type { ReactNode } from "react";
import { BookMeta } from "@/components/bookshelf/book-meta";
import { RelatedBooks } from "@/components/bookshelf/related-books";
import { TopicBadge } from "@/components/bookshelf/topic-badge";
import { RoomTrail } from "@/components/room/room-trail";
import type { BookshelfPost, BookshelfPostMetadata } from "@/types/bookshelf";

type ArticleShellProps = {
  post: BookshelfPost;
  relatedPosts: BookshelfPostMetadata[];
  children: ReactNode;
};

function ArticleCover({ post }: { post: BookshelfPost }) {
  if (post.coverImage) {
    return (
      <div className="relative h-44 overflow-hidden rounded-2xl bg-violet-500/10 md:h-full md:min-h-60">
        <Image src={post.coverImage} alt="" fill sizes="(min-width: 768px) 300px, 100vw" className="object-cover" priority />
      </div>
    );
  }

  return (
    <div className="relative h-36 overflow-hidden rounded-2xl bg-[linear-gradient(135deg,rgba(255,251,235,0.88),rgba(167,139,250,0.2))] dark:bg-[linear-gradient(135deg,rgba(30,41,59,0.88),rgba(167,139,250,0.2))] md:h-full md:min-h-60" aria-hidden="true">
      <div className="absolute left-5 top-5 h-2 w-24 rounded-full bg-violet-500/25" />
      <div className="absolute left-5 top-10 h-2 w-36 rounded-full bg-cyan-500/20" />
      <div className="absolute bottom-5 right-5 font-mono text-xs font-black text-violet-500/45">post</div>
    </div>
  );
}

export function ArticleShell({ post, relatedPosts, children }: ArticleShellProps) {
  return (
    <div className="mx-auto w-full max-w-5xl">
      <RoomTrail items={[{ label: "Workspace", href: "/" }, { label: "Post", href: "/post" }, { label: post.title }]} />

      <article className="mt-4 md:mt-5">
        <header className="grid gap-5 md:grid-cols-[minmax(0,1fr)_18rem] md:items-end">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <TopicBadge topic={post.topic} />
              <BookMeta post={post} showUpdated />
            </div>
            <h1 className="mt-3 max-w-4xl text-3xl font-semibold tracking-tight md:text-5xl md:leading-tight">{post.title}</h1>
            <p className="mt-3 max-w-3xl text-base leading-7 text-muted md:text-lg md:leading-8">{post.description}</p>
          </div>
          <ArticleCover post={post} />
        </header>

        <div className="mt-6 min-w-0 md:mt-7">
          {children}
        </div>
      </article>

      <RelatedBooks posts={relatedPosts} />
    </div>
  );
}
