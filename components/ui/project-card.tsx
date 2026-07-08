import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { Project } from "@/types/project";
import Link from "next/link";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="flex h-full flex-col">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-semibold">{project.title}</h3>
        <span className="rounded-full bg-accent/10 px-2.5 py-1 text-xs font-semibold text-accent">
          {project.status}
        </span>
      </div>
      <p className="mt-3 flex-1 text-sm leading-6 text-muted">{project.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.technologies.map((technology) => (
          <Badge key={technology}>{technology}</Badge>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap gap-4">
        {project.demoUrl ? (
          <Link href={project.demoUrl} className="focus-ring rounded-md text-sm font-semibold text-accent hover:underline">
            Demo
          </Link>
        ) : null}
        {project.githubUrl ? (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="focus-ring rounded-md text-sm font-semibold text-accent hover:underline"
          >
            GitHub
          </a>
        ) : null}
      </div>
    </Card>
  );
}
