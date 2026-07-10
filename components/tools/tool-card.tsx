import { ToolStatusBadge } from "@/components/tools/tool-status-badge";
import type { PersonalTool } from "@/lib/tools";
import { cn } from "@/lib/utils";

type ToolCardProps = {
  tool: PersonalTool;
};

const statusLight: Record<PersonalTool["status"], string> = {
  available: "bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.55)]",
  building: "bg-cyan-400 shadow-[0_0_18px_rgba(34,211,238,0.45)]",
  idea: "bg-slate-400",
  paused: "bg-amber-400 shadow-[0_0_18px_rgba(251,191,36,0.35)]",
};

export function ToolCard({ tool }: ToolCardProps) {
  const hasActions = Boolean(tool.demoUrl || tool.sourceUrl);

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-cyan-700/15 bg-cyan-50/45 p-3 text-foreground shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-cyan-600/35 hover:bg-cyan-50/80 hover:shadow-soft dark:border-cyan-500/16 dark:bg-slate-950 dark:text-slate-100 dark:hover:border-cyan-400/55 md:p-4">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-600/45 to-transparent dark:via-cyan-300/70" />
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2.5 md:gap-3">
          <span className={cn("size-2.5 shrink-0 rounded-full md:size-3", statusLight[tool.status])} aria-hidden="true" />
          <div className="min-w-0">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300 md:text-[11px]">
              drawer item
            </p>
            <h3 className="mt-0.5 truncate text-base font-semibold md:text-lg">{tool.name}</h3>
          </div>
        </div>
        <ToolStatusBadge status={tool.status} />
      </div>

      <p className="mt-2 line-clamp-2 text-sm leading-5 text-muted dark:text-slate-300 md:mt-3 md:leading-6">{tool.description}</p>

      <div className="mt-3 flex flex-wrap gap-1.5 md:mt-4 md:gap-2">
        {tool.builtWith.slice(0, 4).map((item) => (
          <span key={item} className="rounded-md border border-cyan-700/15 bg-cyan-100/70 px-2 py-1 font-mono text-[10px] font-semibold text-cyan-900 dark:border-cyan-300/15 dark:bg-cyan-300/[0.08] dark:text-cyan-100 md:text-[11px]">
            {item}
          </span>
        ))}
      </div>

      {hasActions ? (
        <div className="mt-3 flex flex-wrap gap-2 md:mt-4">
          {tool.demoUrl ? (
            <a
              href={tool.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring rounded-lg bg-emerald-400 px-3 py-1.5 text-xs font-bold text-slate-950 transition hover:bg-emerald-300"
            >
              open
            </a>
          ) : null}
          {tool.sourceUrl ? (
            <a
              href={tool.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring rounded-lg border border-cyan-700/20 px-3 py-1.5 text-xs font-bold text-cyan-800 transition hover:border-cyan-700/50 dark:border-cyan-300/25 dark:text-cyan-100 dark:hover:border-cyan-200/60"
            >
              Source
            </a>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}
