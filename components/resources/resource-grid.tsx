import { ResourceCard } from "@/components/resources/resource-card";
import { EmptyState } from "@/components/ui/empty-state";
import type { ResourceItem } from "@/lib/resources";

type ResourceGridProps = {
  resources: ResourceItem[];
  variant?: "inventory" | "pinned";
};

export function ResourceGrid({ resources, variant = "inventory" }: ResourceGridProps) {
  if (resources.length === 0) {
    return <EmptyState title="Rương đang trống" description="Chưa có món nào trong ngăn này." />;
  }

  return (
    <div className={variant === "pinned" ? "grid gap-3 md:grid-cols-3" : "grid gap-3 sm:grid-cols-2 xl:grid-cols-4"}>
      {resources.map((resource) => (
        <ResourceCard key={resource.id} resource={resource} variant={variant} />
      ))}
    </div>
  );
}
