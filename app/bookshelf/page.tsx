import { BookshelfGrid } from "@/components/bookshelf/bookshelf-grid";
import { FeaturedBooks } from "@/components/bookshelf/featured-books";
import { EmptyState } from "@/components/ui/empty-state";
import { PageShell } from "@/components/ui/page-shell";
import { getBookshelfPostsForPublicPage } from "@/lib/bookshelf-r2";
import { createPageMetadata } from "@/lib/metadata";

export const revalidate = 60;
export const dynamic = "force-dynamic";

export const metadata = createPageMetadata({
  title: "Gia sach",
  description: "Noi dat bai viet va ghi chep dai hon.",
  path: "/bookshelf",
});

export default async function BookshelfPage() {
  const posts = await getBookshelfPostsForPublicPage();
  const featuredPosts = posts.filter((post) => post.featured);
  const regularPosts = posts.filter((post) => !post.featured);

  return (
    <PageShell>
      <p className="mb-5 font-mono text-sm font-bold uppercase tracking-[0.22em] text-violet-700 dark:text-violet-300">
        Gia sach - {posts.length} ghi chep dang nam tren ke.
      </p>

      <div className="mb-8 flex h-12 items-end gap-2 border-b-4 border-violet-950/20 dark:border-violet-200/15" aria-hidden="true">
        {posts.slice(0, 10).map((post, index) => (
          <span
            key={post.id}
            className="w-8 rounded-t-md bg-violet-500/25"
            style={{ height: `${36 + (index % 4) * 8}px` }}
          />
        ))}
      </div>

      {posts.length === 0 ? (
        <EmptyState title="Ke sach dang trong" description="Chua co bai published hoac R2 chua co index." />
      ) : (
        <>
          <FeaturedBooks posts={featuredPosts} />

          <section className="mt-8">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-violet-700 dark:text-violet-300">
                  Shelf row
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight">Ghi chep moi</h2>
              </div>
              <span className="text-sm font-semibold text-muted">{regularPosts.length} bai</span>
            </div>
            <BookshelfGrid posts={regularPosts.length > 0 ? regularPosts : posts} />
          </section>
        </>
      )}
    </PageShell>
  );
}
