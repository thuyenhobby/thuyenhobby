import Link from "next/link";
import { BookMeta } from "@/components/bookshelf/book-meta";
import { TopicBadge } from "@/components/bookshelf/topic-badge";
import type { BookshelfPostMetadata } from "@/types/bookshelf";

type RelatedBooksProps = {
  posts: BookshelfPostMetadata[];
};

export function RelatedBooks({ posts }: RelatedBooksProps) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="mt-8 md:mt-10" aria-labelledby="related-posts-title">
      <div className="mb-3 flex items-center justify-between gap-4">
        <h2 id="related-posts-title" className="text-lg font-semibold tracking-tight md:text-xl">
          keep reading
        </h2>
        <span className="text-xs font-semibold text-muted">{posts.length} posts</span>
      </div>
      <div className="grid gap-2 md:grid-cols-3">
        {posts.slice(0, 3).map((post) => (
          <Link
            key={post.id}
            href={`/bookshelf/${post.slug}`}
            className="focus-ring group rounded-2xl border border-violet-500/15 bg-background p-3 transition hover:-translate-y-0.5 hover:border-violet-500/45 hover:shadow-sm"
          >
            <TopicBadge topic={post.topic} className="px-2 py-0.5" />
            <h3 className="mt-2 line-clamp-2 text-sm font-semibold leading-5">{post.title}</h3>
            <div className="mt-2">
              <BookMeta post={post} />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
