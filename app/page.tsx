import { Container } from "@/components/layout/container";
import { AuthorNoteSection } from "@/components/sections/author-note-section";
import { BlogHero } from "@/components/sections/blog-hero";
import { FeaturedPosts } from "@/components/sections/featured-posts";
import { SeriesSection } from "@/components/sections/series-section";
import { TopicsSection } from "@/components/sections/topics-section";
import { createPageMetadata } from "@/lib/metadata";
import { getPublishedPosts } from "@/lib/posts";
import { getAllSeries } from "@/lib/series";
import { getAllTopics } from "@/lib/topics";

export const metadata = createPageMetadata({
  title: "Blog học web của Thuyên Trần",
  description:
    "Blog chia sẻ kiến thức về Next.js, frontend, deployment, Cloudflare R2, Vercel, GitHub và hành trình xây dựng sản phẩm web cá nhân.",
  path: "/",
});

export default function HomePage() {
  const latestPosts = getPublishedPosts().slice(0, 3);
  const topics = getAllTopics().filter((topic) => (topic.count ?? 0) > 0).slice(0, 6);
  const series = getAllSeries();

  return (
    <Container>
      <BlogHero />
      <FeaturedPosts posts={latestPosts} />
      <TopicsSection topics={topics} />
      <SeriesSection series={series} />
      <AuthorNoteSection />
    </Container>
  );
}
