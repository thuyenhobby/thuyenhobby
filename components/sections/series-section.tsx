import Link from "next/link";
import { Section } from "@/components/layout/section";
import { SeriesCard } from "@/components/ui/series-card";
import type { Series } from "@/types/series";

type SeriesSectionProps = {
  series: Series[];
};

export function SeriesSection({ series }: SeriesSectionProps) {
  return (
    <Section>
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="text-sm font-semibold text-accent">Series</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight">Series nổi bật</h2>
        </div>
        <Link href="/series" className="focus-ring rounded-md text-sm font-semibold text-accent hover:underline">
          Xem series
        </Link>
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {series.map((item) => (
          <SeriesCard key={item.slug} series={item} />
        ))}
      </div>
    </Section>
  );
}
