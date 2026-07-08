import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { R2Image } from "@/components/ui/r2-image";
import { isRemoteAssetUrl } from "@/lib/r2";
import type { Project } from "@/types/project";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const hasImage = isRemoteAssetUrl(project.image);

  return (
    <Card className="flex h-full flex-col overflow-hidden p-0">
      <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-accent/10">
        {hasImage ? (
          <R2Image
            src={project.image!}
            alt={`${project.title} cover image`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover"
            fallbackLabel={project.title}
            fallbackClassName="px-6 text-sm font-semibold text-accent"
          />
        ) : (
          <div className="flex h-full items-center justify-center px-6 text-center text-sm font-semibold text-accent">
            {project.title}
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
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
      </div>
    </Card>
  );
}
