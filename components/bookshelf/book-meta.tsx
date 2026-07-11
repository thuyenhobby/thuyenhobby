import type { BookshelfPostMetadata } from "@/types/bookshelf";
import { cn } from "@/lib/utils";

type BookMetaProps = {
  post: Pick<BookshelfPostMetadata, "date" | "readingTime" | "updatedAt">;
  showUpdated?: boolean;
  className?: string;
};

export function BookMeta({ post, showUpdated = false, className }: BookMetaProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-semibold text-muted", className)}>
      <time dateTime={post.date}>{post.date}</time>
      {post.readingTime ? (
        <>
          <span aria-hidden="true">/</span>
          <span>{post.readingTime}</span>
        </>
      ) : null}
      {showUpdated && post.updatedAt ? (
        <>
          <span aria-hidden="true">/</span>
          <span>Updated {post.updatedAt}</span>
        </>
      ) : null}
    </div>
  );
}
