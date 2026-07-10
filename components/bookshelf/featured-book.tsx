import Image from "next/image";
import Link from "next/link";
import { BookMeta } from "@/components/bookshelf/book-meta";
import { TopicBadge } from "@/components/bookshelf/topic-badge";
import type { BookshelfPostMetadata } from "@/types/bookshelf";

type FeaturedBookProps = {
  post: BookshelfPostMetadata;
  pinnedPosts?: BookshelfPostMetadata[];
};

function FeaturedVisual({ post }: { post: BookshelfPostMetadata }) {
  if (post.coverImage) {
    return (
      <div className="relative h-28 overflow-hidden rounded-2xl border border-violet-500/20 bg-violet-500/10 md:h-full md:min-h-36">
        <Image src={post.coverImage} alt="" fill sizes="(min-width: 768px) 220px, 100vw" className="object-cover" />
      </div>
    );
  }

  return (
    <div className="relative h-28 overflow-hidden rounded-2xl border border-violet-500/20 bg-[linear-gradient(135deg,rgba(255,251,235,0.82),rgba(167,139,250,0.2))] dark:bg-[linear-gradient(135deg,rgba(30,41,59,0.82),rgba(167,139,250,0.2))] md:h-full md:min-h-36" aria-hidden="true">
      <div className="absolute left-5 top-5 h-2 w-24 rounded-full bg-violet-500/25" />
      <div className="absolute left-5 top-10 h-2 w-36 rounded-full bg-cyan-500/20" />
      <div className="absolute bottom-5 right-5 font-mono text-xs font-black text-violet-500/45">draft.log</div>
    </div>
  );
}

export function FeaturedBook({ post, pinnedPosts = [] }: FeaturedBookProps) {
  return (
    <section className="grid gap-3 lg:grid-cols-[1.4fr_0.6fr]">
      <Link href={`/bookshelf/${post.slug}`} className="focus-ring group block rounded-[1.5rem]">
        <article className="relative overflow-hidden rounded-[1.5rem] border border-violet-500/20 bg-white/78 p-3 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-violet-500/45 dark:bg-slate-950/58 md:p-4">
          <div className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/55 to-transparent" />
          <div className="grid gap-3 md:grid-cols-[1fr_13rem] md:items-stretch">
            <div className="min-w-0 p-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-900 dark:bg-amber-400/10 dark:text-amber-200">
                  pinned note
                </span>
                <TopicBadge topic={post.topic} />
              </div>
              <h2 className="mt-3 line-clamp-2 text-xl font-semibold tracking-tight md:text-2xl">{post.title}</h2>
              <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted">{post.description}</p>
              <div className="mt-3">
                <BookMeta post={post} />
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5 text-xs font-semibold">
                {post.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="rounded-md bg-violet-500/10 px-2 py-1 text-violet-700 dark:text-violet-300">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <FeaturedVisual post={post} />
          </div>
        </article>
      </Link>

      {pinnedPosts.length > 0 ? (
        <aside className="rounded-[1.5rem] border border-violet-500/15 bg-violet-500/[0.04] p-3 md:p-4">
          <h3 className="px-1 text-sm font-semibold text-violet-700 dark:text-violet-300">brain kept this</h3>
          <div className="mt-3 space-y-2">
            {pinnedPosts.slice(0, 3).map((pinnedPost) => (
              <Link
                key={pinnedPost.id}
                href={`/bookshelf/${pinnedPost.slug}`}
                className="focus-ring group flex items-center gap-3 rounded-2xl border border-violet-500/12 bg-background px-3 py-2.5 transition hover:translate-x-1 hover:border-violet-500/40"
              >
                <span className="size-2.5 rounded-full bg-violet-500/65" aria-hidden="true" />
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold">{pinnedPost.title}</span>
                  <span className="mt-0.5 block text-xs text-muted">{pinnedPost.readingTime ?? pinnedPost.topic}</span>
                </span>
              </Link>
            ))}
          </div>
        </aside>
      ) : null}
    </section>
  );
}
