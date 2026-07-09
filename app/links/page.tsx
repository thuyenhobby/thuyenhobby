import { PageShell } from "@/components/ui/page-shell";
import { SectionHeader } from "@/components/ui/section-header";
import { Tag } from "@/components/ui/tag";
import { resourceLinks } from "@/lib/links";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Links",
  description: "Kệ tài nguyên của Thuyên: tài liệu, docs và repo đáng lưu cho hành trình học web.",
  path: "/links",
});

export default function LinksPage() {
  return (
    <PageShell>
      <SectionHeader
        eyebrow="Bookshelf"
        title="Links"
        description="Kệ tài nguyên: tài liệu, docs và link tôi muốn giữ lại để quay về khi cần."
      />
      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {resourceLinks.map((link) => (
          <article key={link.title} className="rounded-2xl border border-border p-5 transition hover:border-accent">
            <p className="text-sm font-semibold text-accent">{link.category}</p>
            <h2 className="mt-2 text-lg font-semibold">{link.title}</h2>
            <p className="mt-3 text-sm leading-6 text-muted">{link.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {link.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
            <a href={link.url} target="_blank" rel="noreferrer" className="mt-5 inline-block text-sm font-semibold text-accent hover:underline">
              Open resource
            </a>
          </article>
        ))}
      </div>
    </PageShell>
  );
}
