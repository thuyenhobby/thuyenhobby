import Link from "next/link";
import type { Project } from "@/lib/projects";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="rounded-lg border border-border p-5 transition hover:border-accent">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-semibold">{project.title}</h3>
        <span className="rounded-full bg-accent/10 px-2.5 py-1 text-xs font-semibold text-accent">
          {project.year}
        </span>
      </div>
      <p className="mt-3 text-sm leading-6 text-muted">{project.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span key={tag} className="rounded-full border border-border px-2.5 py-1 text-xs text-muted">
            {tag}
          </span>
        ))}
      </div>
      {project.url ? (
        <Link href={project.url} className="mt-5 inline-block text-sm font-semibold text-accent hover:underline">
          Xem chi tiet
        </Link>
      ) : null}
    </article>
  );
}
