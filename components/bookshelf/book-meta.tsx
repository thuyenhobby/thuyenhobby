import type { BookshelfPostMetadata } from "@/types/bookshelf";

type BookMetaProps = {
  post: Pick<BookshelfPostMetadata, "date" | "readingTime" | "updatedAt">;
  showUpdated?: boolean;
};

export function BookMeta({ post, showUpdated = false }: BookMetaProps) {
  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-semibold text-muted">
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
