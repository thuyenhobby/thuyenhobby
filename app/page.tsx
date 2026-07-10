import { ActivityStrip } from "@/components/workspace/activity-strip";
import { WorkspaceBoard } from "@/components/workspace/workspace-board";
import { PageHeading } from "@/components/ui/page-heading";
import { PageShell } from "@/components/ui/page-shell";
import { StatPill } from "@/components/ui/stat-pill";
import { getBookshelfPostsForPublicPage } from "@/lib/bookshelf-r2";
import { createPageMetadata } from "@/lib/metadata";
import { resources } from "@/lib/resources";
import { roomZones } from "@/lib/room";
import { tools } from "@/lib/tools";

export const metadata = createPageMetadata({
  title: "anx.thnw",
  description: "A personal workspace for notes, memories, and small things I build.",
  path: "/",
});

function newestByDate<T extends { addedAt?: string; date?: string }>(items: T[]) {
  return [...items].sort((a, b) => Number(new Date(b.addedAt ?? b.date ?? 0)) - Number(new Date(a.addedAt ?? a.date ?? 0)))[0];
}

export default async function HomePage() {
  const posts = await getBookshelfPostsForPublicPage();
  const latestPost = newestByDate(posts);
  const latestResource = newestByDate(resources);
  const latestTool = newestByDate(tools);

  const activity = [
    { label: "status", value: "quietly building" },
    { label: "latest post", value: latestPost?.title ?? "nothing here yet." },
    { label: "memory", value: latestResource?.title ?? "brain cache is clean for now." },
    { label: "drawer", value: latestTool?.name ?? "still cooking." },
  ];

  return (
    <PageShell variant="wide">
      <PageHeading
        eyebrow="Workspace"
        title="anx.thnw"
        description="notes, memories, tools — quietly building."
        size="sm"
        compact
        stats={<StatPill label="zones" value={roomZones.length} tone="cyan" />}
      />

      <WorkspaceBoard zones={roomZones} />

      <div className="mt-3 md:mt-4">
        <ActivityStrip items={activity} />
      </div>
    </PageShell>
  );
}
