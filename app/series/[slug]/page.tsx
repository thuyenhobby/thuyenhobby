import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { PostCard } from "@/components/ui/post-card";
import { getPostsBySeries } from "@/lib/posts";
import { getAllSeries, getSeriesBySlug } from "@/lib/series";
import { siteConfig } from "@/lib/site";

type SeriesPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllSeries().map((series) => ({ slug: series.slug }));
}

export async function generateMetadata({ params }: SeriesPageProps): Promise<Metadata> {
  const { slug } = await params;
  const series = getSeriesBySlug(slug);

  if (!series) {
    return {};
  }

  return {
    title: `${series.title} | Series`,
    description: series.description,
    alternates: {
      canonical: `/series/${series.slug}`,
    },
    openGraph: {
      title: `${series.title} | ${siteConfig.name} Blog`,
      description: series.description,
      url: `${siteConfig.url}/series/${series.slug}`,
      siteName: `${siteConfig.name} Blog`,
      locale: "vi_VN",
      type: "website",
    },
  };
}

export default async function SeriesDetailPage({ params }: SeriesPageProps) {
  const { slug } = await params;
  const series = getSeriesBySlug(slug);

  if (!series) {
    notFound();
  }

  const posts = getPostsBySeries(series.slug);

  return (
    <Section>
      <Container>
        <div className="max-w-3xl">
          <p className="text-sm font-semibold text-accent">Series</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight">{series.title}</h1>
          <p className="mt-4 leading-7 text-muted">{series.description}</p>
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
