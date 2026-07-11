import Image from "next/image";
import Link from "next/link";
import { TopicBadge } from "@/components/bookshelf/topic-badge";
import type { BookshelfPostMetadata } from "@/types/bookshelf";

type BookCardProps = {
  post: BookshelfPostMetadata;
};

function formatPostDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

function CoverImage({ post }: Pick<BookCardProps, "post">) {
  return (
    <span className="relative block aspect-[16/9] overflow-hidden rounded-2xl bg-violet-500/[0.06] dark:bg-violet-500/[0.08]" aria-hidden="true">
      {post.coverImage ? (
        <Image src={post.coverImage} alt="" fill sizes="(min-width: 1280px) 380px, (min-width: 640px) 50vw, 100vw" className="object-cover transition duration-300 group-hover:scale-105" />
      ) : (
        <>
          <span className="absolute left-5 top-5 h-2 w-20 rounded-full bg-violet-500/30" />
          <span className="absolute left-5 top-10 h-2 w-32 rounded-full bg-cyan-500/20" />
          <span className="absolute bottom-5 right-5 font-mono text-xs font-black uppercase tracking-[0.18em] text-violet-500/45">post</span>
        </>
      )}
    </span>
  );
}

export function BookCard({ post }: BookCardProps) {
  const displayDate = formatPostDate(post.date);

  return (
    <li className="min-w-0">
      <Link
        href={`/post/${post.slug}`}
        className="focus-ring group block h-full rounded-[1.35rem] border border-violet-500/15 bg-background p-2.5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-violet-500/35 hover:shadow-md dark:bg-slate-950/45"
        aria-label={`Open post ${post.title}`}
      >
        <CoverImage post={post} />

        <article className="px-1.5 pb-1 pt-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <TopicBadge topic={post.topic} className="px-2 py-0.5" />
            <time dateTime={post.date} className="text-xs font-semibold text-muted">
              {displayDate}
            </time>
          </div>

          <h3 className="mt-3 line-clamp-2 text-lg font-semibold leading-6 tracking-tight transition group-hover:text-violet-700 dark:group-hover:text-violet-300">
            {post.title}
          </h3>
        </article>
      </Link>
    </li>
  );
}
