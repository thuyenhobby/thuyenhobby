import Link from "next/link";
import type { BookshelfPostMetadata } from "@/types/bookshelf";

type BookCardProps = {
  post: BookshelfPostMetadata;
};

export function BookCard({ post }: BookCardProps) {
  return (
    <Link
      href={`/bookshelf/${post.slug}`}
      className="focus-ring group block rounded-[1.4rem]"
      aria-label={`Đọc ${post.title}`}
    >
      <article className="relative min-h-56 overflow-hidden rounded-[1.4rem] border border-violet-500/18 bg-[linear-gradient(90deg,rgba(109,40,217,0.22)_0,rgba(109,40,217,0.22)_18px,rgba(255,255,255,0.72)_18px)] p-5 pl-9 shadow-sm transition duration-200 hover:-translate-y-1 hover:-rotate-1 hover:border-violet-500/45 hover:shadow-soft dark:bg-[linear-gradient(90deg,rgba(167,139,250,0.24)_0,rgba(167,139,250,0.24)_18px,rgba(30,41,59,0.55)_18px)]">
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-violet-800/30 via-amber-500/25 to-transparent" />
        <div className="flex items-start justify-between gap-4">
          <span className="rounded-full bg-violet-500/10 px-2.5 py-1 text-xs font-bold text-violet-700 dark:text-violet-300">
            {post.topic}
          </span>
          <time className="text-xs font-semibold text-muted" dateTime={post.date}>
            {post.date}
          </time>
        </div>
        <h3 className="mt-5 text-xl font-semibold leading-7 tracking-tight">{post.title}</h3>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted">{post.description}</p>
        <div className="mt-5 flex flex-wrap items-center gap-2 text-xs font-semibold">
          {post.readingTime ? <span className="rounded-md bg-violet-500/10 px-2 py-1 text-violet-700 dark:text-violet-300">{post.readingTime}</span> : null}
          {post.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="rounded-md bg-amber-100 px-2 py-1 text-amber-900 dark:bg-amber-400/10 dark:text-amber-200">
              {tag}
            </span>
          ))}
        </div>
      </article>
    </Link>
  );
}
