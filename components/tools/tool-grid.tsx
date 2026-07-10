import { EmptyState } from "@/components/ui/empty-state";
import { ToolCard } from "@/components/tools/tool-card";
import type { PersonalTool } from "@/lib/tools";

type ToolGridProps = {
  tools: PersonalTool[];
};

export function ToolGrid({ tools }: ToolGridProps) {
  if (tools.length === 0) {
    return <EmptyState title="this drawer is suspiciously empty." description="still cooking." />;
  }

  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      {tools.map((tool) => (
        <ToolCard key={tool.id} tool={tool} />
      ))}
    </div>
  );
}
