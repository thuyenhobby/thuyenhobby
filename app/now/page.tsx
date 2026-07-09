import { PageShell } from "@/components/ui/page-shell";
import { SectionHeader } from "@/components/ui/section-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { Tag } from "@/components/ui/tag";
import { createPageMetadata } from "@/lib/metadata";
import { nowData } from "@/lib/now";

export const metadata = createPageMetadata({
  title: "Now",
  description: "Trạng thái hiện tại của Thuyên: đang học gì, xây gì, thử gì và quan tâm điều gì.",
  path: "/now",
});

const sections = [
  { title: "Đang học", items: nowData.currentlyLearning },
  { title: "Đang xây", items: nowData.currentlyBuilding },
  { title: "Đang thử", items: nowData.currentlyExploring },
  { title: "Đang đọc", items: nowData.currentlyReading },
  { title: "Mục tiêu gần nhất", items: nowData.shortTermGoals },
];

export default function NowPage() {
  return (
    <PageShell>
      <SectionHeader
        eyebrow="Desk"
        title="Now"
        description="Một dashboard nhỏ cho trạng thái hiện tại: tôi đang học gì, đang xây gì và đang để ý điều gì."
      />
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {sections.map((section) => (
          <section key={section.title} className="rounded-2xl border border-border p-5">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-lg font-semibold">{section.title}</h2>
              <StatusBadge>current</StatusBadge>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {section.items.map((item) => (
                <Tag key={item}>{item}</Tag>
              ))}
            </div>
          </section>
        ))}
      </div>
    </PageShell>
  );
}
