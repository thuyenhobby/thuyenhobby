import { PageShell } from "@/components/ui/page-shell";
import { SectionHeader } from "@/components/ui/section-header";
import { Tag } from "@/components/ui/tag";
import { createPageMetadata } from "@/lib/metadata";
import { timelineItems } from "@/lib/timeline";

export const metadata = createPageMetadata({
  title: "Timeline",
  description: "Dòng thời gian ghi lại các mốc Thuyên xây website, deploy Vercel, tích hợp R2 và tạo digital room.",
  path: "/timeline",
});

export default function TimelinePage() {
  return (
    <PageShell className="max-w-3xl">
      <SectionHeader
        eyebrow="Timeline Wall"
        title="Timeline"
        description="Một bức tường nhỏ ghi lại các mốc trong hành trình học, build và chỉnh căn phòng số này."
      />
      <div className="mt-10 space-y-6 border-l border-border pl-6">
        {timelineItems.map((item) => (
          <article key={`${item.date}-${item.title}`} className="relative rounded-2xl border border-border p-5">
            <span className="absolute -left-[31px] top-6 size-3 rounded-full bg-accent ring-4 ring-background" />
            <time className="text-sm font-semibold text-accent" dateTime={item.date}>
              {item.date}
            </time>
            <h2 className="mt-2 text-lg font-semibold">{item.title}</h2>
            <p className="mt-3 text-sm leading-6 text-muted">{item.description}</p>
            {item.tags ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
            ) : null}
          </article>
        ))}
      </div>
    </PageShell>
  );
}
