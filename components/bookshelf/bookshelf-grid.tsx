import { BookCard } from "@/components/bookshelf/book-card";
import type { BookshelfPostMetadata } from "@/types/bookshelf";

type BookshelfGridProps = {
  posts: BookshelfPostMetadata[];
};

export function BookshelfGrid({ posts }: BookshelfGridProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-violet-500/15 bg-background/75 shadow-sm dark:bg-slate-950/45">
      <ul className="divide-y divide-violet-500/12">
        {posts.map((post) => (
          <BookCard key={post.id} post={post} />
        ))}
      </ul>
    </div>
  );
}
