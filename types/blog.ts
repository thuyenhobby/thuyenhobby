export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updatedAt?: string;
  tags: string[];
  topic: string;
  series?: string;
  published: boolean;
  coverImage?: string;
  readingTime?: string;
  featured?: boolean;
  content: string;
};
