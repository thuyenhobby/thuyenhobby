import { ToolGrid } from "@/components/tools/tool-grid";
import { ToolStatusBadge } from "@/components/tools/tool-status-badge";
import { ZoneNextLinks } from "@/components/room/zone-next-links";
import { PageHeading } from "@/components/ui/page-heading";
import { PageShell } from "@/components/ui/page-shell";
import { SectionHeader } from "@/components/ui/section-header";
import { StatPill } from "@/components/ui/stat-pill";
import { createPageMetadata } from "@/lib/metadata";
import { getFeaturedTools, getToolsByStatus, tools, type PersonalTool } from "@/lib/tools";

export const metadata = createPageMetadata({
  title: "Drawer — anx.thnw",
  description: "Small tools, experiments, and utilities.",
  path: "/tools",
});

const statusOrder: PersonalTool["status"][] = ["available", "building", "idea", "paused"];

export default function ToolsPage() {
  const featuredTools = getFeaturedTools();

  return (
    <PageShell variant="wide">
      <PageHeading
        eyebrow="Drawer"
        title="Drawer"
        description="small tools, experiments, and random utilities I build along the way."
        size="sm"
        compact
        stats={
          <>
            <StatPill label="tools" value={tools.length} tone="cyan" />
            <StatPill label="ready" value={getToolsByStatus("available").length} tone="emerald" />
            <StatPill label="cooking" value={getToolsByStatus("building").length} tone="cyan" />
          </>
        }
      />

      <section className="rounded-2xl border border-cyan-700/15 bg-cyan-50/45 p-3 text-foreground shadow-sm dark:border-cyan-500/20 dark:bg-slate-950 dark:text-slate-100 md:p-4" aria-label="Drawer status summary">
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
          {statusOrder.map((status) => {
            const count = getToolsByStatus(status).length;

            return (
              <div key={status} className="rounded-2xl border border-cyan-700/10 bg-background p-3 dark:border-cyan-300/12 dark:bg-white/[0.04]">
                <div className="flex items-center justify-between gap-2">
                  <ToolStatusBadge status={status} />
                  <span className="font-mono text-lg font-semibold text-cyan-800 dark:text-cyan-100 md:text-xl">{count}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {featuredTools.length > 0 ? (
        <section className="mt-5 rounded-2xl border border-cyan-500/15 bg-cyan-500/[0.04] p-3 md:mt-6 md:p-4">
          <SectionHeader
            eyebrow="pinned modules"
            title="usable enough"
            action={<span className="text-xs font-semibold text-muted md:text-sm">{featuredTools.length} pinned</span>}
          />
          <ToolGrid tools={featuredTools} />
        </section>
      ) : null}

      <section className="mt-5 md:mt-6">
        <SectionHeader
          eyebrow="drawer slots"
          title="small utilities"
          action={<span className="text-xs font-semibold text-muted md:text-sm">{tools.length} tools</span>}
        />
        <ToolGrid tools={tools} />
      </section>

      <ZoneNextLinks current="drawer" />
    </PageShell>
  );
}
