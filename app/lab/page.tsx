import { PageShell } from "@/components/ui/page-shell";
import { SectionHeader } from "@/components/ui/section-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { Tag } from "@/components/ui/tag";
import { labItems } from "@/lib/lab";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Lab",
  description: "Phòng thí nghiệm công nghệ của Thuyên: thử nghiệm, workflow, project nhỏ và demo.",
  path: "/lab",
});

export default function LabPage() {
  return (
    <PageShell>
      <SectionHeader
        eyebrow="Computer"
        title="Lab"
        description="Những thử nghiệm nhỏ đang giúp tôi hiểu hơn về Next.js, Vercel, Cloudflare R2 và giao diện web."
      />
      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {labItems.map((item) => (
          <article key={item.title} className="rounded-2xl border border-border p-5 transition hover:border-accent">
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <StatusBadge>{item.status}</StatusBadge>
            </div>
            <p className="mt-3 text-sm leading-6 text-muted">{item.description}</p>
            <p className="mt-4 text-xs font-semibold text-muted">{item.date}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          </article>
        ))}
      </div>
    </PageShell>
  );
}
