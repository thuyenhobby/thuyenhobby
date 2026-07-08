import Link from "next/link";
import { Section } from "@/components/layout/section";
import { ProjectCard } from "@/components/ui/project-card";
import type { Project } from "@/types/project";

type FeaturedProjectsSectionProps = {
  projects: Project[];
};

export function FeaturedProjectsSection({ projects }: FeaturedProjectsSectionProps) {
  return (
    <Section>
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="text-sm font-semibold text-accent">Featured work</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight">Featured Projects</h2>
        </div>
        <Link href="/projects" className="focus-ring rounded-md text-sm font-semibold text-accent hover:underline">
          Xem tất cả
        </Link>
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </Section>
  );
}
