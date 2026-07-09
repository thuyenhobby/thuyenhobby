import type { ResourceItem } from "@/lib/resources";
import { cn } from "@/lib/utils";

type ResourceCardProps = {
  resource: ResourceItem;
  variant?: "inventory" | "pinned";
};

const typeLabel: Record<ResourceItem["type"], string> = {
  link: "URL",
  file: "FILE",
  note: "NOTE",
  repo: "REPO",
};

const typeMark: Record<ResourceItem["type"], string> = {
  link: "↗",
  file: "F",
  note: "N",
  repo: "G",
};

export function ResourceCard({ resource, variant = "inventory" }: ResourceCardProps) {
  const isPinned = variant === "pinned";

  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-amber-900/15 bg-amber-50/65 p-4 shadow-sm transition duration-200 dark:border-amber-300/15 dark:bg-amber-950/20",
        "hover:-translate-y-0.5 hover:border-amber-500/45 hover:bg-amber-100/70 dark:hover:bg-amber-900/25",
        isPinned && "border-amber-500/40 bg-amber-100/80 dark:bg-amber-900/30",
      )}
    >
      <div className="absolute inset-y-3 left-0 w-1 rounded-r-full bg-amber-500/50 transition group-hover:bg-amber-500" />
      <div className="flex items-start gap-3 pl-2">
        <span
          className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg border border-amber-700/15 bg-white/70 font-mono text-xs font-bold text-amber-800 dark:bg-amber-950 dark:text-amber-200"
          aria-hidden="true"
        >
          {typeMark[resource.type]}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-700 dark:text-amber-300">
                {resource.category}
              </p>
              <h3 className="mt-1 text-sm font-semibold leading-6 text-stone-950 dark:text-stone-50">
                {resource.title}
              </h3>
            </div>
            {resource.favorite ? (
              <span className="rounded-full border border-amber-500/30 bg-amber-200/60 px-2 py-0.5 text-[11px] font-semibold text-amber-900 dark:bg-amber-500/15 dark:text-amber-200">
                pinned
              </span>
            ) : null}
          </div>
          <p className="mt-2 line-clamp-2 text-xs leading-5 text-stone-600 dark:text-stone-300">
            {resource.description}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            <span className="rounded-md bg-stone-950 px-2 py-1 font-mono text-[10px] font-semibold text-amber-100 dark:bg-amber-200 dark:text-stone-950">
              {typeLabel[resource.type]}
            </span>
            {resource.tags.slice(0, isPinned ? 3 : 2).map((tag) => (
              <span key={tag} className="rounded-md bg-white/65 px-2 py-1 text-[11px] font-semibold text-stone-600 dark:bg-white/10 dark:text-stone-300">
                {tag}
              </span>
            ))}
          </div>
          {resource.url ? (
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Mở ${resource.title}`}
              className="focus-ring mt-4 inline-flex rounded-md text-xs font-bold text-amber-800 underline-offset-4 hover:underline dark:text-amber-200"
            >
              Mở link ↗
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
