import { Container } from "@/components/layout/container";
import { AboutPreviewSection } from "@/components/sections/about-preview-section";
import { ContactCtaSection } from "@/components/sections/contact-cta-section";
import { FeaturedProjectsSection } from "@/components/sections/featured-projects-section";
import { HeroSection } from "@/components/sections/hero-section";
import { LatestPostsSection } from "@/components/sections/latest-posts-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { getAllPosts } from "@/lib/blog";
import { createPageMetadata } from "@/lib/metadata";
import { projects } from "@/lib/projects";

export const metadata = createPageMetadata({
  title: "Thuyên Trần - Web Developer Portfolio",
  description:
    "Portfolio cá nhân của Thuyên Trần, Web Developer / Frontend Developer tập trung vào Next.js, TypeScript, UI hiện đại và triển khai trên Vercel.",
  path: "/",
});

export default function HomePage() {
  const posts = getAllPosts().slice(0, 3);
  const featuredProjects = projects.filter((project) => project.featured).slice(0, 3);

  return (
    <Container>
      <HeroSection />
      <AboutPreviewSection />
      <SkillsSection />
      <FeaturedProjectsSection projects={featuredProjects} />
      <LatestPostsSection posts={posts} />
      <ContactCtaSection />
    </Container>
  );
}
