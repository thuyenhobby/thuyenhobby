export type Project = {
  slug: string;
  title: string;
  description: string;
  technologies: string[];
  status: "Planning" | "In Progress" | "Live" | "Maintained";
  demoUrl?: string;
  githubUrl?: string;
  image?: string;
  featured?: boolean;
};
