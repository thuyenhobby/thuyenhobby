import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SeriesCard } from "@/components/ui/series-card";
import { createPageMetadata } from "@/lib/metadata";
import { getAllSeries } from "@/lib/series";

export const metadata = createPageMetadata({
  title: "Series",
  description: "Các series bài viết giúp theo dõi hành trình xây blog, học Next.js và deploy website cá nhân.",
  path: "/series",
});

export default function SeriesPage() {
  const series = getAllSeries();

  return (
    <Section>
      <Container>
        <div className="max-w-3xl">
          <p className="text-sm font-semibold text-accent">Series</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight">Series nội dung</h1>
          <p className="mt-4 leading-7 text-muted">
            Các chuỗi bài viết được nhóm theo một hành trình cụ thể để bạn đọc liền mạch hơn.
          </p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {series.map((item) => (
            <SeriesCard key={item.slug} series={item} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
