import { BookCard } from "@/components/bookshelf/book-card";
import type { BookshelfPostMetadata } from "@/types/bookshelf";

type BookshelfGridProps = {
  posts: BookshelfPostMetadata[];
};

export function BookshelfGrid({ posts }: BookshelfGridProps) {
  return (
    <div className="relative">
      <div className="absolute inset-x-0 bottom-0 hidden h-3 rounded-full bg-violet-950/10 dark:bg-violet-200/10 md:block" aria-hidden="true" />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BookCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
