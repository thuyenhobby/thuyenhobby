import { assets } from "@/lib/assets";
import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    slug: "personal-portfolio-website",
    title: "Personal Portfolio Website",
    description:
      "Website cá nhân của Thuyên Trần, được xây dựng bằng Next.js App Router để giới thiệu năng lực, dự án và bài viết kỹ thuật.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "SEO"],
    status: "Live",
    featured: true,
    demoUrl: "/",
    githubUrl: "https://github.com/",
    image: assets.projects.personalWebsite,
  },
  {
    slug: "blog-platform",
    title: "Blog Platform",
    description:
      "Nền tảng blog tối giản, tập trung vào trải nghiệm đọc, cấu trúc nội dung sạch và khả năng nâng cấp sang MDX.",
    technologies: ["Next.js", "Markdown", "MDX Ready", "Content Design"],
    status: "In Progress",
    featured: true,
    demoUrl: "/blog",
    githubUrl: "https://github.com/",
    image: assets.projects.blogPlatform,
  },
  {
    slug: "cloud-storage-gallery",
    title: "Cloud Storage Gallery",
    description:
      "Ý tưởng thư viện media dùng Cloudflare R2 để lưu trữ ảnh/file nhẹ, phù hợp cho portfolio và nội dung blog.",
    technologies: ["Cloudflare R2", "Next.js", "Object Storage", "Image Delivery"],
    status: "Planning",
    featured: true,
    githubUrl: "https://github.com/",
    image: assets.projects.r2Gallery,
  },
];
