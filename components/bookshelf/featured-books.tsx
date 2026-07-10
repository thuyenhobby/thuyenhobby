import { FeaturedBook } from "@/components/bookshelf/featured-book";
import type { BookshelfPostMetadata } from "@/types/bookshelf";

type FeaturedBooksProps = {
  posts: BookshelfPostMetadata[];
};

export function FeaturedBooks({ posts }: FeaturedBooksProps) {
  const [primary, ...rest] = posts;

  if (!primary) {
    return null;
  }

  return <FeaturedBook post={primary} pinnedPosts={rest} />;
}
