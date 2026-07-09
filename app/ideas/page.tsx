import { PageShell } from "@/components/ui/page-shell";
import { SectionHeader } from "@/components/ui/section-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { Tag } from "@/components/ui/tag";
import { ideas } from "@/lib/ideas";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Ideas",
  description: "Bảng ý tưởng cá nhân của Thuyên: dashboard, R2 gallery, bookmark manager và các project nhỏ.",
  path: "/ideas",
});

export default function IdeasPage() {
  return (
    <PageShell>
      <SectionHeader
        eyebrow="Sticky Board"
        title="Ideas"
        description="Một bảng ý tưởng giống sticky notes: thứ muốn thử, muốn xây hoặc đang tạm để dành."
      />
      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {ideas.map((idea) => (
          <article
            key={idea.title}
            className="rounded-2xl border border-border bg-accent/5 p-5 shadow-soft transition hover:-translate-y-1 hover:border-accent"
          >
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-lg font-semibold">{idea.title}</h2>
              <StatusBadge>{idea.status}</StatusBadge>
            </div>
            <p className="mt-3 text-sm leading-6 text-muted">{idea.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {idea.priority ? <Tag>{idea.priority}</Tag> : null}
              {idea.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          </article>
        ))}
      </div>
    </PageShell>
  );
}
