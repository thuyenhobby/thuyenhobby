import { assets } from "@/lib/assets";

export type ShelfPost = {
  id: string;
  title: string;
  slug: string;
  description: string;
  date: string;
  updatedAt?: string;
  topic: string;
  tags: string[];
  readingTime?: string;
  coverImage?: string;
  published: boolean;
  featured?: boolean;
  content: string;
};

export const shelfPosts: ShelfPost[] = [
  {
    id: "why-anx-thnw",
    title: "Why I keep a tiny personal workspace",
    slug: "why-i-keep-a-tiny-personal-workspace",
    description: "A short note on why this site exists.",
    date: "2026-07-10",
    topic: "Workspace",
    tags: ["Workspace", "Personal Build"],
    readingTime: "4 min read",
    coverImage: assets.blog.learningNotes,
    published: true,
    featured: true,
    content:
      "I want a small place on the internet for notes, saved links, files, and tiny tools. A workspace metaphor keeps it simple: Me for context, Post for longer notes, Memory for saved things, and Drawer for utilities.",
  },
  {
    id: "first-github-website",
    title: "Putting the site on GitHub",
    slug: "putting-the-site-on-github",
    description: "Small steps that make the project easier to track.",
    date: "2026-07-09",
    topic: "GitHub",
    tags: ["GitHub", "Git"],
    readingTime: "5 min read",
    coverImage: assets.blog.githubGuide,
    published: true,
    content:
      "GitHub helps me keep a history of changes. The important bits are a correct .gitignore, small commits, and a README that still makes sense later.",
  },
  {
    id: "vercel-deploy",
    title: "Deploying a Next.js site with Vercel",
    slug: "deploying-a-nextjs-site-with-vercel",
    description: "A fast deploy loop for a personal site.",
    date: "2026-07-08",
    topic: "Deployment",
    tags: ["Vercel", "Next.js"],
    readingTime: "5 min read",
    coverImage: assets.blog.vercelDeploy,
    published: true,
    featured: true,
    content:
      "Vercel keeps the loop short: push code, check preview, fix build, ship. For a personal site, that low friction matters.",
  },
  {
    id: "r2-resources",
    title: "Saving public assets with Cloudflare R2",
    slug: "saving-public-assets-with-cloudflare-r2",
    description: "Keep images and files out of the repository.",
    date: "2026-07-07",
    topic: "Cloudflare R2",
    tags: ["R2", "Assets"],
    readingTime: "6 min read",
    coverImage: assets.blog.cloudflareR2,
    published: true,
    content:
      "I use R2 for public assets such as covers and files. Components do not build URLs manually; they go through lib/assets.ts and lib/r2.ts.",
  },
  {
    id: "organize-personal-workspace",
    title: "Organizing a personal workspace",
    slug: "organizing-a-personal-workspace",
    description: "A few UI, routing, and data lessons.",
    date: "2026-07-06",
    topic: "Learning Notes",
    tags: ["Learning", "UI"],
    readingTime: "5 min read",
    coverImage: assets.blog.nextjsStructure,
    published: true,
    featured: true,
    content:
      "A compact workspace works better when each zone has a job. Keep the homepage short, split data clearly, and keep the build stable.",
  },
];

export function getPublishedShelfPosts() {
  return shelfPosts.filter((post) => post.published).sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));
}

export function getFeaturedShelfPosts() {
  return getPublishedShelfPosts().filter((post) => post.featured);
}

export function getFeaturedPosts() {
  return getFeaturedShelfPosts();
}

export function getShelfPostBySlug(slug: string) {
  return getPublishedShelfPosts().find((post) => post.slug === slug);
}
