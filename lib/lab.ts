export type LabItem = {
  title: string;
  description: string;
  status: "idea" | "testing" | "building" | "done" | "paused";
  tags: string[];
  date: string;
  link?: string;
};

export const labItems: LabItem[] = [
  {
    title: "Cloudflare R2 Assets",
    description: "Manage public images and files through one helper instead of hard-coded URLs.",
    status: "building",
    tags: ["R2", "Assets", "Next.js"],
    date: "2026-07-10",
  },
  {
    title: "Next.js App Router",
    description: "Keep routes small and focused around workspace zones.",
    status: "testing",
    tags: ["Next.js", "Routing"],
    date: "2026-07-10",
  },
  {
    title: "Vercel Auto Deploy",
    description: "Keep push, build, preview, and deploy simple.",
    status: "done",
    tags: ["Vercel", "Deploy"],
    date: "2026-07-09",
  },
  {
    title: "Light/Dark Interface",
    description: "Tune contrast and depth without making the UI heavy.",
    status: "testing",
    tags: ["UI", "Dark Mode"],
    date: "2026-07-09",
  },
  {
    title: "Workspace Board",
    description: "Turn the homepage into a compact board for Me, Post, Memory, and Drawer.",
    status: "building",
    tags: ["Design", "Workspace"],
    date: "2026-07-11",
  },
  {
    title: "R2 Image Gallery Idea",
    description: "A small gallery powered by R2 for screenshots, demos, and notes.",
    status: "idea",
    tags: ["R2", "Gallery"],
    date: "2026-07-10",
  },
];
