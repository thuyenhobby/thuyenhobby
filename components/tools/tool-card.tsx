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
    <article className="group relative overflow-hidden rounded-2xl border border-cyan-700/15 bg-cyan-50/45 p-4 text-foreground shadow-sm transition duration-200 hover:-translate-y-1 hover:border-cyan-600/35 hover:bg-cyan-50/80 hover:shadow-soft dark:border-cyan-500/16 dark:bg-slate-950 dark:text-slate-100 dark:hover:border-cyan-400/55">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-600/45 to-transparent dark:via-cyan-300/70" />
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className={cn("size-3 rounded-full", statusLight[tool.status])} aria-hidden="true" />
          <div>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-300">
              module
            </p>
            <h3 className="mt-1 text-lg font-semibold">{tool.name}</h3>
          </div>
        </div>
        <ToolStatusBadge status={tool.status} />
      </div>

      <p className="mt-4 line-clamp-2 text-sm leading-6 text-muted dark:text-slate-300">{tool.description}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {tool.builtWith.map((item) => (
          <span key={item} className="rounded-md border border-cyan-700/15 bg-cyan-100/70 px-2 py-1 font-mono text-[11px] font-semibold text-cyan-900 dark:border-cyan-300/15 dark:bg-cyan-300/[0.08] dark:text-cyan-100">
            {item}
          </span>
        ))}
      </div>

      {hasActions ? (
        <div className="mt-6 flex flex-wrap gap-2">
          {tool.demoUrl ? (
            <a
              href={tool.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring rounded-lg bg-emerald-400 px-3 py-2 text-xs font-bold text-slate-950 transition hover:bg-emerald-300"
            >
              Mở tool
            </a>
          ) : null}
          {tool.sourceUrl ? (
            <a
              href={tool.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring rounded-lg border border-cyan-700/20 px-3 py-2 text-xs font-bold text-cyan-800 transition hover:border-cyan-700/50 dark:border-cyan-300/25 dark:text-cyan-100 dark:hover:border-cyan-200/60"
            >
              Source
            </a>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}
