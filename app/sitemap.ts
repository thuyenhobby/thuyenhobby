import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { getAllSeries } from "@/lib/series";
import { siteConfig } from "@/lib/site";
import { getAllTopics } from "@/lib/topics";

const staticRoutes = ["", "/about", "/blog", "/topics", "/series", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticUrls = staticRoutes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const blogUrls = getAllPosts().map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const topicUrls = getAllTopics().map((topic) => ({
    url: `${siteConfig.url}/topics/${topic.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const seriesUrls = getAllSeries().map((series) => ({
    url: `${siteConfig.url}/series/${series.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticUrls, ...blogUrls, ...topicUrls, ...seriesUrls];
}
