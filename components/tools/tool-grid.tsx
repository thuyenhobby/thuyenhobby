import { EmptyState } from "@/components/ui/empty-state";
import { ToolCard } from "@/components/tools/tool-card";
import type { PersonalTool } from "@/lib/tools";

type ToolGridProps = {
  tools: PersonalTool[];
};

export function ToolGrid({ tools }: ToolGridProps) {
  if (tools.length === 0) {
    return <EmptyState title="Chưa có công cụ" description="Nhóm này đang trống." />;
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {tools.map((tool) => (
        <ToolCard key={tool.id} tool={tool} />
      ))}
    </div>
  );
}
