import fs from "node:fs";
import path from "node:path";

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  content: string;
};

const blogDirectory = path.join(process.cwd(), "content", "blog");

function parseFrontmatter(fileContent: string) {
  const match = /^---\s*([\s\S]*?)\s*---\s*([\s\S]*)$/m.exec(fileContent);

  if (!match) {
    return { metadata: {}, content: fileContent };
  }

  const metadata = match[1].split("\n").reduce<Record<string, string>>((acc, line) => {
    const separatorIndex = line.indexOf(":");

    if (separatorIndex === -1) {
      return acc;
    }

    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim().replace(/^["']|["']$/g, "");
    acc[key] = value;
    return acc;
  }, {});

  return { metadata, content: match[2].trim() };
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(blogDirectory)) {
    return [];
  }

  return fs
    .readdirSync(blogDirectory)
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const filePath = path.join(blogDirectory, fileName);
      const { metadata, content } = parseFrontmatter(fs.readFileSync(filePath, "utf8"));

      return {
        slug,
        title: metadata.title ?? slug,
        description: metadata.description ?? "",
        date: metadata.date ?? new Date().toISOString(),
        content,
      };
    })
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));
}

export function getPostBySlug(slug: string) {
  return getAllPosts().find((post) => post.slug === slug);
}
