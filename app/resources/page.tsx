import { ResourceGrid } from "@/components/resources/resource-grid";
import { ZoneNextLinks } from "@/components/room/zone-next-links";
import { PageHeading } from "@/components/ui/page-heading";
import { PageShell } from "@/components/ui/page-shell";
import { SectionHeader } from "@/components/ui/section-header";
import { StatPill } from "@/components/ui/stat-pill";
import { createPageMetadata } from "@/lib/metadata";
import {
  getFavoriteResources,
  getResourceCategories,
  getResourcesByCategory,
  resources,
  type ResourceItem,
} from "@/lib/resources";

export const metadata = createPageMetadata({
  title: "Memory — anx.thnw",
  description: "Links, files, snippets, and saved things.",
  path: "/resources",
});

const categoryLabel: Record<ResourceItem["category"], string> = {
  docs: "Docs",
  tool: "Utilities",
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
    <PageShell variant="wide">
      <PageHeading
        eyebrow="Memory"
        title="Memory"
        description="links, files, snippets, and things I don’t want to search twice."
        size="sm"
        compact
        stats={
          <>
            <StatPill label="saved" value={resources.length} tone="amber" />
            <StatPill label="pinned" value={favorites.length} tone="amber" />
            <StatPill label="blocks" value={categories.length} tone="amber" />
          </>
        }
      />

      <section className="rounded-2xl border border-amber-800/15 bg-amber-50/35 p-2 dark:border-amber-300/10 dark:bg-amber-950/10 md:p-3" aria-label="Memory categories">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {categories.map((category) => (
            <a
              key={category}
              href={`#${category}`}
              className="focus-ring flex min-w-max items-center gap-2 rounded-xl border border-amber-900/15 bg-background px-3 py-1.5 text-sm font-semibold text-amber-900 transition hover:-translate-y-0.5 hover:border-amber-500/50 dark:border-amber-300/15 dark:text-amber-100 md:py-2"
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
        <section className="mt-5 md:mt-6">
          <SectionHeader title="pinned memory" eyebrow="saved for later" action={<span className="text-xs font-semibold text-amber-700 dark:text-amber-300 md:text-sm">{favorites.length} items</span>} />
          <ResourceGrid resources={favorites} variant="pinned" />
        </section>
      ) : null}

      <section className="mt-5 space-y-4 md:mt-6 md:space-y-5" aria-label="Memory blocks">
        {categories.map((category) => {
          const items = getResourcesByCategory(category);

          return (
            <div key={category} id={category} className="scroll-mt-20 rounded-2xl border border-amber-900/10 bg-amber-50/25 p-3 dark:border-amber-300/10 dark:bg-amber-950/10 md:p-4">
              <SectionHeader
                title={categoryLabel[category]}
                eyebrow="archive block"
                action={<span className="text-xs font-semibold text-muted">{items.length} items</span>}
              />
              <ResourceGrid resources={items} />
            </div>
          );
        })}
      </section>

      <ZoneNextLinks current="memory" />
    </PageShell>
  );
}
