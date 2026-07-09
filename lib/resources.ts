export type ResourceItem = {
  id: string;
  title: string;
  description: string;
  url?: string;
  category: "docs" | "tool" | "template" | "snippet" | "reference" | "asset" | "checklist";
  type: "link" | "file" | "note" | "repo";
  tags: string[];
  favorite?: boolean;
  addedAt: string;
};

export const resourceCategories: ResourceItem["category"][] = [
  "docs",
  "tool",
  "template",
  "snippet",
  "reference",
  "checklist",
  "asset",
];

export const resources: ResourceItem[] = [
  {
    id: "nextjs-docs",
    title: "Next.js Docs",
    description: "App Router, metadata và deployment.",
    url: "https://nextjs.org/docs",
    category: "docs",
    type: "link",
    tags: ["Next.js", "Docs"],
    favorite: true,
    addedAt: "2026-07-10",
  },
  {
    id: "vercel-docs",
    title: "Vercel Docs",
    description: "Deploy, preview và env.",
    url: "https://vercel.com/docs",
    category: "docs",
    type: "link",
    tags: ["Vercel", "Deploy"],
    favorite: true,
    addedAt: "2026-07-10",
  },
  {
    id: "cloudflare-r2-docs",
    title: "Cloudflare R2 Docs",
    description: "Object storage cho assets public.",
    url: "https://developers.cloudflare.com/r2/",
    category: "docs",
    type: "link",
    tags: ["Cloudflare", "R2"],
    favorite: true,
    addedAt: "2026-07-10",
  },
  {
    id: "tailwind-css-docs",
    title: "Tailwind CSS Docs",
    description: "Utility class và responsive.",
    url: "https://tailwindcss.com/docs",
    category: "docs",
    type: "link",
    tags: ["Tailwind", "CSS"],
    addedAt: "2026-07-10",
  },
  {
    id: "github-docs",
    title: "GitHub Docs",
    description: "Repo, Git workflow và security.",
    url: "https://docs.github.com/",
    category: "docs",
    type: "link",
    tags: ["GitHub", "Git"],
    addedAt: "2026-07-10",
  },
  {
    id: "git-cheat-sheet",
    title: "Git Cheat Sheet",
    description: "Command Git hay dùng.",
    category: "snippet",
    type: "note",
    tags: ["Git", "Command"],
    addedAt: "2026-07-10",
  },
  {
    id: "personal-website-checklist",
    title: "Personal Website Checklist",
    description: "Metadata, env, build, responsive.",
    category: "checklist",
    type: "note",
    tags: ["Checklist", "Deploy"],
    addedAt: "2026-07-10",
  },
  {
    id: "r2-asset-structure",
    title: "R2 Asset Structure",
    description: "Cấu trúc thư mục assets public.",
    category: "asset",
    type: "note",
    tags: ["R2", "Assets"],
    addedAt: "2026-07-10",
  },
];

export function getFavoriteResources() {
  return resources.filter((resource) => resource.favorite);
}

export function getResourceCategories() {
  return resourceCategories.filter((category) => resources.some((resource) => resource.category === category));
}

export function getResourcesByCategory(category: ResourceItem["category"]) {
  return resources.filter((resource) => resource.category === category);
}
