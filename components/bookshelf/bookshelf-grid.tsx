import { BookCard } from "@/components/bookshelf/book-card";
import type { BookshelfPostMetadata } from "@/types/bookshelf";

type BookshelfGridProps = {
  posts: BookshelfPostMetadata[];
};

export function BookshelfGrid({ posts }: BookshelfGridProps) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {posts.map((post) => (
        <BookCard key={post.id} post={post} />
      ))}
    </ul>
  );
}
