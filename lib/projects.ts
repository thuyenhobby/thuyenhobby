export type Project = {
  slug: string;
  title: string;
  description: string;
  year: string;
  tags: string[];
  featured?: boolean;
  url?: string;
};

export const projects: Project[] = [
  {
    slug: "portfolio-nextjs",
    title: "Portfolio Next.js",
    description: "Website ca nhan toi uu SEO, dark mode va content Markdown de mo rong dai han.",
    year: "2026",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    featured: true,
    url: "/projects",
  },
  {
    slug: "analytics-dashboard",
    title: "Analytics Dashboard",
    description: "Dashboard responsive cho product metrics voi UI gon, ro trang thai va de doc tren mobile.",
    year: "2025",
    tags: ["React", "Charts", "UX"],
    featured: true,
  },
  {
    slug: "content-platform",
    title: "Content Platform",
    description: "Nen tang noi dung tinh nhe, cache tot va san sang ket noi object storage nhu Cloudflare R2.",
    year: "2025",
    tags: ["SEO", "R2", "CMS"],
    featured: true,
  },
];
