import Link from "next/link";
import type { BookshelfPostMetadata } from "@/types/bookshelf";

type FeaturedBooksProps = {
  posts: BookshelfPostMetadata[];
};

export function FeaturedBooks({ posts }: FeaturedBooksProps) {
  const [primary, ...rest] = posts;

  if (!primary) {
    return null;
  }

  return (
    <section className="grid gap-5 lg:grid-cols-[1.35fr_0.65fr]">
      <Link href={`/bookshelf/${primary.slug}`} className="focus-ring group block rounded-[2rem]">
        <article className="relative overflow-hidden rounded-[2rem] border border-violet-500/20 bg-[linear-gradient(100deg,rgba(255,251,235,0.9)_0,rgba(255,251,235,0.9)_49%,rgba(109,40,217,0.16)_50%,rgba(255,255,255,0.7)_51%)] p-6 shadow-soft transition duration-200 hover:-translate-y-1 dark:bg-[linear-gradient(100deg,rgba(30,41,59,0.75)_0,rgba(30,41,59,0.75)_49%,rgba(167,139,250,0.18)_50%,rgba(15,23,42,0.72)_51%)] sm:p-8">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-violet-700 dark:text-violet-300">
            Sách đang mở
          </p>
          <h2 className="mt-5 max-w-2xl text-3xl font-semibold tracking-tight">{primary.title}</h2>
          <p className="mt-4 max-w-xl text-sm leading-6 text-muted">{primary.description}</p>
          <div className="mt-8 flex flex-wrap gap-2 text-xs font-semibold">
            <span className="rounded-full bg-violet-500/10 px-3 py-1.5 text-violet-700 dark:text-violet-300">
              {primary.topic}
            </span>
            {primary.readingTime ? (
              <span className="rounded-full bg-amber-100 px-3 py-1.5 text-amber-900 dark:bg-amber-400/10 dark:text-amber-200">
                {primary.readingTime}
              </span>
            ) : null}
          </div>
        </article>
      </Link>

      <aside className="rounded-[2rem] border border-violet-500/15 bg-violet-500/[0.04] p-4">
        <h3 className="px-2 text-sm font-semibold text-violet-700 dark:text-violet-300">Ghim trên kệ</h3>
        <div className="mt-4 space-y-2">
          {rest.slice(0, 3).map((post) => (
            <Link
              key={post.id}
              href={`/bookshelf/${post.slug}`}
              className="focus-ring group flex items-center gap-3 rounded-2xl border border-violet-500/12 bg-background px-3 py-3 transition hover:translate-x-1 hover:border-violet-500/40"
            >
              <span className="h-12 w-3 rounded-full bg-violet-500/45" aria-hidden="true" />
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold">{post.title}</span>
                <span className="mt-1 block text-xs text-muted">{post.readingTime ?? post.topic}</span>
              </span>
            </Link>
          ))}
        </div>
      </aside>
    </section>
  );
}
