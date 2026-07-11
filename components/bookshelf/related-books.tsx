import Image from "next/image";
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
      <h2 id="related-posts-title" className="text-lg font-semibold tracking-tight md:text-xl">
        Gợi ý đọc tiếp
      </h2>
      <ul className="mt-3 divide-y divide-violet-500/12 overflow-hidden rounded-2xl border border-violet-500/15 bg-background/80 shadow-sm dark:bg-slate-950/45">
        {posts.slice(0, 5).map((post) => (
          <li key={post.id}>
            <Link
              href={`/post/${post.slug}`}
              className="focus-ring group grid gap-3 px-3 py-3 transition hover:bg-violet-500/[0.05] sm:grid-cols-[5rem_1fr_auto] sm:items-center md:px-4"
            >
              <span
                className="relative hidden h-14 overflow-hidden rounded-xl border border-violet-500/15 bg-violet-500/[0.06] sm:block"
                aria-hidden="true"
              >
                {post.coverImage ? (
                  <Image src={post.coverImage} alt="" fill sizes="80px" className="object-cover transition duration-200 group-hover:scale-105" />
                ) : (
                  <span className="absolute inset-0 bg-[linear-gradient(135deg,rgba(139,92,246,0.2),rgba(34,211,238,0.12))]" />
                )}
              </span>

              <span className="min-w-0">
                <span className="flex flex-wrap items-center gap-2">
                  <TopicBadge topic={post.topic} className="px-2 py-0.5" />
                  <BookMeta post={post} />
                </span>
                <span className="mt-1.5 block line-clamp-1 text-sm font-semibold leading-5 transition group-hover:text-violet-700 dark:group-hover:text-violet-300">
                  {post.title}
                </span>
              </span>

              <span className="text-xs font-bold text-violet-700 dark:text-violet-300">-&gt;</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
