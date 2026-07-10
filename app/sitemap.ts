import type { MetadataRoute } from "next";
import { getBookshelfPostsForPublicPage } from "@/lib/bookshelf-r2";
import { siteConfig } from "@/lib/site";

const staticRoutes = ["", "/about", "/bookshelf", "/resources", "/tools"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticUrls = staticRoutes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const bookshelfPosts = await getBookshelfPostsForPublicPage();
  const bookshelfUrls = bookshelfPosts.map((post) => ({
    url: `${siteConfig.url}/bookshelf/${post.slug}`,
    lastModified: new Date(post.updatedAt ?? post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticUrls, ...bookshelfUrls];
}
