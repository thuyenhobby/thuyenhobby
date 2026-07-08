import { getPostBySlug as getStaticPostBySlug, getPublishedPosts } from "@/lib/posts";

export function getAllPosts() {
  return getPublishedPosts();
}

export function getPostBySlug(slug: string) {
  return getStaticPostBySlug(slug);
}
