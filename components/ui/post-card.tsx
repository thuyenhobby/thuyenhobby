import Link from "next/link";
import { Card } from "@/components/ui/card";
import { R2Image } from "@/components/ui/r2-image";
import { isRemoteAssetUrl } from "@/lib/r2";
import type { BlogPost } from "@/types/blog";

type PostCardProps = {
  post: BlogPost;
};

export function PostCard({ post }: PostCardProps) {
  const hasCoverImage = isRemoteAssetUrl(post.coverImage);

  return (
    <Link href={`/blog/${post.slug}`} className="focus-ring block rounded-lg">
      <Card className="overflow-hidden p-0">
        <div className="relative aspect-[16/9] overflow-hidden border-b border-border bg-accent/10">
          {hasCoverImage ? (
            <R2Image
              src={post.coverImage!}
              alt={`${post.title} cover image`}
              fill
              sizes="(min-width: 768px) 640px, 100vw"
              className="object-cover"
              fallbackLabel={post.tags[0] ?? "Blog"}
              fallbackClassName="px-6 text-sm font-semibold text-accent"
            />
          ) : (
            <div className="flex h-full items-center justify-center px-6 text-center text-sm font-semibold text-accent">
              {post.tags[0] ?? "Blog"}
            </div>
          )}
        </div>
        <div className="p-5">
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted">
            <time dateTime={post.date}>
              {new Intl.DateTimeFormat("vi-VN", { dateStyle: "medium" }).format(new Date(post.date))}
            </time>
            {post.readingTime ? <span>· {post.readingTime}</span> : null}
            <span>· {post.topic}</span>
          </div>
          <h3 className="mt-2 text-lg font-semibold">{post.title}</h3>
          <p className="mt-2 text-sm leading-6 text-muted">{post.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {post.featured ? (
              <span className="rounded-full bg-foreground px-2.5 py-1 text-xs font-semibold text-background">
                Featured
              </span>
            ) : null}
            {post.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-accent/10 px-2.5 py-1 text-xs font-semibold text-accent">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Card>
    </Link>
  );
}
