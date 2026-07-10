import { PageShell } from "@/components/ui/page-shell";
import { SectionHeader } from "@/components/ui/section-header";
import { StatusBadge } from "@/components/ui/status-badge";
import { Tag } from "@/components/ui/tag";
import { createPageMetadata } from "@/lib/metadata";
import { nowData } from "@/lib/now";

export const metadata = createPageMetadata({
  title: "Now",
  description: "What I am learning, building, testing, and keeping nearby.",
  path: "/now",
});

const sections = [
  { title: "learning", items: nowData.currentlyLearning },
  { title: "building", items: nowData.currentlyBuilding },
  { title: "testing", items: nowData.currentlyExploring },
  { title: "reading", items: nowData.currentlyReading },
  { title: "next", items: nowData.shortTermGoals },
];

export default function NowPage() {
  return (
    <PageShell>
      <SectionHeader
        eyebrow="Me"
        title="Now"
        description="A tiny status board for what is currently on my desk."
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
