import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Cac du an web, product va engineering duoc chon loc.",
};

export default function ProjectsPage() {
  return (
    <Section>
      <Container>
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-accent">Projects</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight">Du an da thuc hien</h1>
          <p className="mt-4 text-muted">
            Mot so case study va san pham mau, duoc luu bang du lieu tinh trong lib/projects.ts.
          </p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
