import Link from "next/link";
import { Card } from "@/components/ui/card";
import { R2Image } from "@/components/ui/r2-image";
import { isRemoteAssetUrl } from "@/lib/r2";
import type { Series } from "@/types/series";

type SeriesCardProps = {
  series: Series;
};

export function SeriesCard({ series }: SeriesCardProps) {
  const hasCoverImage = isRemoteAssetUrl(series.coverImage);

  return (
    <Link href={`/series/${series.slug}`} className="focus-ring block rounded-lg">
      <Card className="h-full overflow-hidden p-0">
        <div className="relative aspect-[16/9] border-b border-border bg-accent/10">
          {hasCoverImage ? (
            <R2Image
              src={series.coverImage!}
              alt={`${series.title} cover image`}
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              className="object-cover"
              fallbackLabel="Series"
              fallbackClassName="text-sm font-semibold text-accent"
            />
          ) : (
            <div className="flex h-full items-center justify-center px-6 text-center text-sm font-semibold text-accent">
              Series
            </div>
          )}
        </div>
        <div className="p-5">
          <p className="text-sm font-semibold text-accent">{series.posts.length} bài viết</p>
          <h3 className="mt-2 text-lg font-semibold">{series.title}</h3>
          <p className="mt-2 text-sm leading-6 text-muted">{series.description}</p>
        </div>
      </Card>
    </Link>
  );
}
