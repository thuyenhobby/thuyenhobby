import { ToolGrid } from "@/components/tools/tool-grid";
import { ToolStatusBadge } from "@/components/tools/tool-status-badge";
import { PageShell } from "@/components/ui/page-shell";
import { createPageMetadata } from "@/lib/metadata";
import { getFeaturedTools, getToolsByStatus, tools, type PersonalTool } from "@/lib/tools";

export const metadata = createPageMetadata({
  title: "Công cụ",
  description: "Các tiện ích nhỏ và mini app cá nhân.",
  path: "/tools",
});

const statusOrder: PersonalTool["status"][] = ["available", "building", "idea", "paused"];

export default function ToolsPage() {
  const featuredTools = getFeaturedTools();

  return (
    <PageShell>
      <p className="mb-5 font-mono text-sm font-bold uppercase tracking-[0.22em] text-cyan-700 dark:text-cyan-300">
        Công cụ - {tools.length} tiện ích nhỏ, {getToolsByStatus("available").length} sẵn sàng.
      </p>

      <section className="rounded-[2rem] border border-cyan-700/15 bg-cyan-50/45 p-4 text-foreground shadow-soft dark:border-cyan-500/20 dark:bg-slate-950 dark:text-slate-100">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {statusOrder.map((status) => {
            const count = getToolsByStatus(status).length;

            return (
              <div key={status} className="rounded-2xl border border-cyan-700/10 bg-background p-4 dark:border-cyan-300/12 dark:bg-white/[0.04]">
                <div className="flex items-center justify-between gap-3">
                  <ToolStatusBadge status={status} />
                  <span className="font-mono text-xl font-semibold text-cyan-800 dark:text-cyan-100">{count}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {featuredTools.length > 0 ? (
        <section className="mt-10 rounded-[2rem] border border-cyan-500/15 bg-cyan-500/[0.04] p-4">
          <div className="mb-4 flex items-center justify-between gap-4">
            <h2 className="font-mono text-sm font-bold uppercase tracking-[0.22em] text-cyan-700 dark:text-cyan-300">
              Đang ghim
            </h2>
            <span className="text-sm font-semibold text-muted">{featuredTools.length} nổi bật</span>
          </div>
          <ToolGrid tools={featuredTools} />
        </section>
      ) : null}

      <section className="mt-10">
        <div className="mb-5 flex items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold tracking-tight">Bảng công cụ</h2>
          <span className="text-sm font-semibold text-muted">{tools.length} tools</span>
        </div>
        <ToolGrid tools={tools} />
      </section>
    </PageShell>
  );
}
