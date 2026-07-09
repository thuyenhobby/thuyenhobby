import { ResourceGrid } from "@/components/resources/resource-grid";
import { PageShell } from "@/components/ui/page-shell";
import { createPageMetadata } from "@/lib/metadata";
import {
  getFavoriteResources,
  getResourceCategories,
  getResourcesByCategory,
  resources,
  type ResourceItem,
} from "@/lib/resources";

export const metadata = createPageMetadata({
  title: "Rương đồ",
  description: "Kho tài nguyên cá nhân: link, checklist, snippet và file.",
  path: "/resources",
});

const categoryLabel: Record<ResourceItem["category"], string> = {
  docs: "Docs",
  tool: "Tools",
  template: "Templates",
  snippet: "Snippets",
  reference: "References",
  checklist: "Checklists",
  asset: "Assets",
};

export default function ResourcesPage() {
  const favorites = getFavoriteResources();
  const categories = getResourceCategories();

  return (
    <PageShell>
      <p className="mb-5 font-mono text-sm font-bold uppercase tracking-[0.22em] text-amber-800 dark:text-amber-300">
        Rương đồ - {resources.length} món, {favorites.length} pinned, {categories.length} ngăn.
      </p>

      <section className="rounded-3xl border border-amber-800/15 bg-amber-50/35 p-3 dark:border-amber-300/10 dark:bg-amber-950/10" aria-label="Resource categories">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {categories.map((category) => (
            <a
              key={category}
              href={`#${category}`}
              className="focus-ring flex min-w-max items-center gap-2 rounded-xl border border-amber-900/15 bg-background px-3 py-2 text-sm font-semibold text-amber-900 transition hover:-translate-y-0.5 hover:border-amber-500/50 dark:border-amber-300/15 dark:text-amber-100"
            >
              <span className="size-2 rounded-full bg-amber-500" aria-hidden="true" />
              {categoryLabel[category]}
              <span className="rounded-md bg-amber-500/15 px-1.5 py-0.5 text-xs">
                {getResourcesByCategory(category).length}
              </span>
            </a>
          ))}
        </div>
      </section>

      {favorites.length > 0 ? (
        <section className="mt-8">
          <div className="mb-4 flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold tracking-tight">Pinned items</h2>
            <span className="text-sm font-semibold text-amber-700 dark:text-amber-300">ưu tiên mở nhanh</span>
          </div>
          <ResourceGrid resources={favorites} variant="pinned" />
        </section>
      ) : null}

      <section className="mt-8 space-y-6">
        {categories.map((category) => {
          const items = getResourcesByCategory(category);

          return (
            <div key={category} id={category} className="scroll-mt-24 rounded-3xl border border-amber-900/10 bg-amber-50/25 p-4 dark:border-amber-300/10 dark:bg-amber-950/10">
              <div className="mb-4 flex items-center justify-between gap-4">
                <h2 className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-amber-800 dark:text-amber-300">
                  {categoryLabel[category]}
                </h2>
                <span className="text-xs font-semibold text-muted">{items.length} items</span>
              </div>
              <ResourceGrid resources={items} />
            </div>
          );
        })}
      </section>
    </PageShell>
  );
}
