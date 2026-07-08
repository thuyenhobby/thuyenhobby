import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ProjectCard } from "@/components/project-card";
import { getAllPosts } from "@/lib/blog";
import { projects } from "@/lib/projects";

export default function HomePage() {
  const posts = getAllPosts().slice(0, 2);
  const featuredProjects = projects.filter((project) => project.featured).slice(0, 3);

  return (
    <>
      <Section className="pt-16 sm:pt-24">
        <Container>
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              Portfolio / Blog
            </p>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-6xl">
              Xay dung san pham web nhanh, gon va co chieu sau.
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted">
              Xin chao, toi la Nguyen Van A. Toi thiet ke va phat trien cac ung dung web
              tap trung vao performance, accessibility va trai nghiem nguoi dung dai han.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/projects"
                className="focus-ring rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background transition hover:opacity-90"
              >
                Xem projects
              </Link>
              <Link
                href="/contact"
                className="focus-ring rounded-full border border-border px-5 py-3 text-sm font-semibold transition hover:border-accent hover:text-accent"
              >
                Lien he
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-sm font-semibold text-accent">Featured work</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight">Du an noi bat</h2>
            </div>
            <Link href="/projects" className="text-sm font-semibold text-accent hover:underline">
              Tat ca du an
            </Link>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-semibold text-accent">Writing</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight">Ghi chu moi nhat</h2>
              <p className="mt-4 text-muted">
                Cac bai viet ve engineering, product thinking va cach xay dung website ben vung.
              </p>
            </div>
            <div className="space-y-4">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="focus-ring block rounded-lg border border-border p-5 transition hover:border-accent"
                >
                  <p className="text-sm text-muted">
                    {new Intl.DateTimeFormat("vi-VN", { dateStyle: "medium" }).format(
                      new Date(post.date),
                    )}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold">{post.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{post.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
