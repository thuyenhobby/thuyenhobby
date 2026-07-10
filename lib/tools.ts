export type PersonalTool = {
  id: string;
  name: string;
  slug: string;
  description: string;
  status: "idea" | "building" | "available" | "paused";
  tags: string[];
  builtWith: string[];
  demoUrl?: string;
  sourceUrl?: string;
  addedAt: string;
  featured?: boolean;
};

export const tools: PersonalTool[] = [
  {
    id: "r2-image-gallery",
    name: "R2 Image Gallery",
    slug: "r2-image-gallery",
    description: "Gallery ảnh public từ Cloudflare R2.",
    status: "idea",
    tags: ["R2", "Gallery"],
    builtWith: ["Next.js", "Cloudflare R2"],
    addedAt: "2026-07-10",
    featured: true,
  },
  {
    id: "bookmark-organizer",
    name: "Bookmark Organizer",
    slug: "bookmark-organizer",
    description: "Gom link học tập theo tag.",
    status: "building",
    tags: ["Links", "Memory"],
    builtWith: ["TypeScript"],
    addedAt: "2026-07-10",
    featured: true,
  },
  {
    id: "markdown-note-helper",
    name: "Markdown Note Helper",
    slug: "markdown-note-helper",
    description: "Chuẩn hóa ghi chú Markdown.",
    status: "idea",
    tags: ["Markdown", "Notes"],
    builtWith: ["React", "TypeScript"],
    addedAt: "2026-07-10",
  },
  {
    id: "git-command-cheatsheet",
    name: "Git Command Cheatsheet",
    slug: "git-command-cheatsheet",
    description: "Command Git theo tình huống.",
    status: "available",
    tags: ["Git", "Commands"],
    builtWith: ["Next.js"],
    addedAt: "2026-07-10",
    featured: true,
  },
  {
    id: "learning-tracker",
    name: "Learning Tracker",
    slug: "learning-tracker",
    description: "Theo dõi topic và mục tiêu học.",
    status: "building",
    tags: ["Learning", "Dashboard"],
    builtWith: ["React", "Tailwind CSS"],
    addedAt: "2026-07-10",
  },
  {
    id: "text-formatter",
    name: "Text Formatter",
    slug: "text-formatter",
    description: "Trim, slugify, lowercase, copy.",
    status: "paused",
    tags: ["Utility", "Text"],
    builtWith: ["TypeScript"],
    addedAt: "2026-07-10",
  },
];

export function getFeaturedTools() {
  return tools.filter((tool) => tool.featured);
}

export function getAvailableTools() {
  return tools.filter((tool) => tool.status === "available");
}

export function getToolsByStatus(status: PersonalTool["status"]) {
  return tools.filter((tool) => tool.status === status);
}
