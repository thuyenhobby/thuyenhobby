import { WorkspaceCard } from "@/components/workspace/workspace-card";
import type { RoomZone } from "@/lib/room";

type WorkspaceBoardProps = {
  zones: RoomZone[];
};

export function WorkspaceBoard({ zones }: WorkspaceBoardProps) {
  return (
    <section
      aria-label="Workspace board"
      className="relative overflow-hidden rounded-[1.75rem] border border-border bg-[linear-gradient(180deg,rgba(255,255,255,0.72),rgba(248,250,252,0.92)),radial-gradient(circle_at_20%_10%,rgba(34,211,238,0.16),transparent_30%),radial-gradient(circle_at_82%_18%,rgba(168,85,247,0.14),transparent_28%)] p-3 shadow-sm dark:bg-[linear-gradient(180deg,rgba(15,23,42,0.72),rgba(2,6,23,0.92)),radial-gradient(circle_at_20%_10%,rgba(34,211,238,0.12),transparent_30%),radial-gradient(circle_at_82%_18%,rgba(168,85,247,0.12),transparent_28%)] md:p-4"
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.05)_1px,transparent_1px)] bg-[size:28px_28px] dark:bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)]" aria-hidden="true" />
      <div className="relative grid gap-3 sm:grid-cols-2">
        {zones.map((zone) => (
          <WorkspaceCard key={zone.id} zone={zone} />
        ))}
      </div>
    </section>
  );
}
