import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ProjectCard } from "@/components/ui/project-card";
import { createPageMetadata } from "@/lib/metadata";
import { projects } from "@/lib/projects";

export const metadata = createPageMetadata({
  title: "Projects - Thuyên Trần",
  description:
    "Các dự án portfolio của Thuyên Trần, gồm website cá nhân, blog platform và ý tưởng Cloud Storage Gallery với Cloudflare R2.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <Section>
      <Container>
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-accent">Projects</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight">Dự án nổi bật</h1>
          <p className="mt-4 leading-7 text-muted">
            Một số dự án mẫu thể hiện cách tôi tổ chức giao diện, dữ liệu, nội dung và hạ tầng
            triển khai cho website cá nhân hoặc sản phẩm web nhỏ.
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
