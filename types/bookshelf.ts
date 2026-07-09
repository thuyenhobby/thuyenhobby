export type BookshelfPostMetadata = {
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
};

export type BookshelfPost = BookshelfPostMetadata & {
  content: string;
};

export type BookshelfPostInput = {
  title: string;
  slug: string;
  description: string;
  topic: string;
  tags: string[];
  content: string;
  coverImage?: string;
  published?: boolean;
  featured?: boolean;
};
