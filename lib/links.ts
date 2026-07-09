export type ResourceLink = {
  title: string;
  url: string;
  description: string;
  category: string;
  tags: string[];
};

export const resourceLinks: ResourceLink[] = [
  {
    title: "Next.js Docs",
    url: "https://nextjs.org/docs",
    description: "Tài liệu chính thức cho App Router, metadata, rendering và deploy.",
    category: "Framework",
    tags: ["Next.js", "Docs"],
  },
  {
    title: "Vercel Docs",
    url: "https://vercel.com/docs",
    description: "Hướng dẫn deploy, environment variables, domains và preview workflow.",
    category: "Deployment",
    tags: ["Vercel", "Deploy"],
  },
  {
    title: "Cloudflare R2 Docs",
    url: "https://developers.cloudflare.com/r2/",
    description: "Tài liệu về object storage, public bucket, custom domain và API.",
    category: "Storage",
    tags: ["Cloudflare", "R2"],
  },
  {
    title: "GitHub Docs",
    url: "https://docs.github.com/",
    description: "Tài liệu về GitHub, repository, pull request và security basics.",
    category: "Workflow",
    tags: ["GitHub", "Git"],
  },
  {
    title: "Tailwind CSS Docs",
    url: "https://tailwindcss.com/docs",
    description: "Utility classes, responsive design, dark mode và layout patterns.",
    category: "Styling",
    tags: ["Tailwind", "CSS"],
  },
  {
    title: "MDN Web Docs",
    url: "https://developer.mozilla.org/",
    description: "Nguồn tham khảo nền tảng cho HTML, CSS, JavaScript và Web APIs.",
    category: "Web Platform",
    tags: ["HTML", "CSS", "JavaScript"],
  },
];
