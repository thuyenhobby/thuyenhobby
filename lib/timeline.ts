export type TimelineItem = {
  date: string;
  title: string;
  description: string;
  tags?: string[];
};

export const timelineItems: TimelineItem[] = [
  {
    date: "2026-07-09",
    title: "started the site",
    description: "Set up Next.js, TypeScript, Tailwind CSS, and the first routes.",
    tags: ["Next.js", "Setup"],
  },
  {
    date: "2026-07-09",
    title: "moved it to GitHub",
    description: "Prepared repository, gitignore, and a smoother deploy workflow.",
    tags: ["GitHub", "Workflow"],
  },
  {
    date: "2026-07-09",
    title: "deployed on Vercel",
    description: "Connected the project to Vercel and verified production builds.",
    tags: ["Vercel", "Deploy"],
  },
  {
    date: "2026-07-10",
    title: "connected Cloudflare R2",
    description: "Added R2 helpers, asset registry, and image host config.",
    tags: ["Cloudflare R2", "Assets"],
  },
  {
    date: "2026-07-11",
    title: "renamed the space to anx.thnw",
    description: "Shifted the concept into a compact personal workspace.",
    tags: ["Workspace", "UI"],
  },
];
