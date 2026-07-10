import { BookshelfControls } from "@/components/bookshelf/bookshelf-controls";
import { BookshelfGrid } from "@/components/bookshelf/bookshelf-grid";
import { BookshelfHeader } from "@/components/bookshelf/bookshelf-header";
import { FeaturedBooks } from "@/components/bookshelf/featured-books";
import { ZoneNextLinks } from "@/components/room/zone-next-links";
import { EmptyState } from "@/components/ui/empty-state";
import { PageShell } from "@/components/ui/page-shell";
import { SectionHeader } from "@/components/ui/section-header";
import { getBookshelfPostsForPublicPage } from "@/lib/bookshelf-r2";
import { createPageMetadata } from "@/lib/metadata";
import type { BookshelfPostMetadata } from "@/types/bookshelf";

export const revalidate = 60;
export const dynamic = "force-dynamic";

export const metadata = createPageMetadata({
  title: "Post — anx.thnw",
  description: "Longer notes, thoughts, and things worth keeping.",
  path: "/bookshelf",
});

function getTopicCounts(posts: BookshelfPostMetadata[]) {
  const topics = new Map<string, number>();

  for (const post of posts) {
    topics.set(post.topic, (topics.get(post.topic) ?? 0) + 1);
  }

  return [...topics.entries()]
    .map(([topic, count]) => ({ topic, count }))
    .sort((a, b) => b.count - a.count || a.topic.localeCompare(b.topic));
}

export default async function BookshelfPage() {
  const posts = await getBookshelfPostsForPublicPage();
  const featuredPosts = posts.filter((post) => post.featured);
  const regularPosts = posts.filter((post) => !post.featured);
  const topicCounts = getTopicCounts(posts);

  return (
    <PageShell variant="wide">
      <BookshelfHeader totalPosts={posts.length} featuredPosts={featuredPosts.length} topicCount={topicCounts.length} />
      <BookshelfControls topics={topicCounts} />

      {posts.length === 0 ? (
        <EmptyState title="nothing here yet." description="brain cache is clean for now." />
      ) : (
        <>
          <FeaturedBooks posts={featuredPosts} />

          <section id="shelf-list" className="mt-5 md:mt-6">
            <SectionHeader
              eyebrow="log feed"
              title="recent notes"
              action={<span className="text-xs font-semibold text-muted md:text-sm">{regularPosts.length || posts.length} posts</span>}
            />
            <BookshelfGrid posts={regularPosts.length > 0 ? regularPosts : posts} />
          </section>

          <ZoneNextLinks current="post" />
        </>
      )}
    </PageShell>
  );
}
