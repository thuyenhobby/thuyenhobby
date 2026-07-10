import Link from "next/link";
import { BookMeta } from "@/components/bookshelf/book-meta";
import { TopicBadge } from "@/components/bookshelf/topic-badge";
import type { BookshelfPostMetadata } from "@/types/bookshelf";

type BookCardProps = {
  post: BookshelfPostMetadata;
};

export function BookCard({ post }: BookCardProps) {
  return (
    <li>
      <Link
        href={`/bookshelf/${post.slug}`}
        className="focus-ring group grid gap-3 px-3 py-3 transition duration-200 hover:bg-violet-500/[0.04] sm:grid-cols-[7.5rem_1fr_auto] sm:items-center md:px-4 md:py-4"
        aria-label={`Open post ${post.title}`}
      >
        <div className="flex items-center gap-2 sm:block">
          <span className="inline-flex size-2.5 rounded-full bg-violet-500/70 shadow-[0_0_18px_rgba(139,92,246,0.35)] sm:mb-2" aria-hidden="true" />
          <BookMeta post={post} />
        </div>

        <article className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <TopicBadge topic={post.topic} className="px-2 py-0.5" />
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">log entry</span>
          </div>
          <h3 className="mt-2 line-clamp-2 text-base font-semibold leading-6 tracking-tight transition group-hover:text-violet-700 dark:group-hover:text-violet-300 md:text-lg">
            {post.title}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm leading-5 text-muted">{post.description}</p>
          {post.tags.length > 0 ? (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {post.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="rounded-md bg-foreground/[0.04] px-2 py-1 text-[11px] font-semibold text-muted ring-1 ring-border/70">
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </article>

        <span className="inline-flex items-center justify-between gap-2 text-xs font-bold text-violet-700 dark:text-violet-300 sm:justify-end">
          read
          <span className="transition group-hover:translate-x-0.5" aria-hidden="true">
            →
          </span>
        </span>
      </Link>
    </li>
  );
}
