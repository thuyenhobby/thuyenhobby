import "server-only";
import { deleteR2Object, getR2PublicUrl, getR2TextObject, listR2Objects, putR2Object } from "@/lib/r2-server";
import { getPublishedShelfPosts } from "@/lib/bookshelf";
import type { BookshelfPost, BookshelfPostInput, BookshelfPostMetadata } from "@/types/bookshelf";

const indexKey = "bookshelf/index.json";
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function normalizeMetadata(post: BookshelfPostMetadata): BookshelfPostMetadata {
  return {
    ...post,
    tags: Array.isArray(post.tags) ? post.tags : [],
    featured: Boolean(post.featured),
    readingTime: post.readingTime || undefined,
    coverImage: post.coverImage ? getR2PublicUrl(post.coverImage) : undefined,
  };
}

function rawCoverImage(coverImage?: string) {
  if (!coverImage) {
    return undefined;
  }

  if (/^https?:\/\//i.test(coverImage)) {
    return coverImage;
  }

  return coverImage.trim().replace(/^\/+/, "");
}

function assertSafeSlug(slug: string) {
  if (!slugPattern.test(slug)) {
    throw new Error("Invalid slug. Use lowercase letters, numbers, and hyphens only.");
  }
}

function postBaseKey(slug: string) {
  assertSafeSlug(slug);
  return `bookshelf/posts/${slug}`;
}

function estimateReadingTime(content: string) {
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(wordCount / 220));
  return `${minutes} min read`;
}

function sortNewestFirst<T extends BookshelfPostMetadata>(posts: T[]) {
  return [...posts].sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));
}

function createMetadata(input: BookshelfPostInput, existing?: BookshelfPostMetadata): BookshelfPostMetadata {
  const now = new Date().toISOString().slice(0, 10);
  const slug = input.slug.trim();

  assertSafeSlug(slug);

  return {
    id: existing?.id ?? slug,
    title: input.title.trim(),
    slug,
    description: input.description.trim(),
    date: existing?.date ?? now,
    updatedAt: now,
    topic: input.topic.trim(),
    tags: input.tags.map((tag) => tag.trim()).filter(Boolean),
    readingTime: estimateReadingTime(input.content),
    coverImage: rawCoverImage(input.coverImage),
    published: Boolean(input.published),
    featured: Boolean(input.featured),
  };
}

export async function getBookshelfIndex() {
  const raw = await getR2TextObject(indexKey);

  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as BookshelfPostMetadata[]) : [];
  } catch {
    throw new Error("bookshelf/index.json is not valid JSON.");
  }
}

export async function saveBookshelfIndex(posts: BookshelfPostMetadata[]) {
  await putR2Object(indexKey, JSON.stringify(sortNewestFirst(posts), null, 2), "application/json; charset=utf-8");
}

export async function getPublishedBookshelfPosts() {
  const posts = await getBookshelfIndex();
  return sortNewestFirst(posts.filter((post) => post.published).map(normalizeMetadata));
}

export async function getFeaturedBookshelfPosts() {
  const posts = await getPublishedBookshelfPosts();
  return posts.filter((post) => post.featured);
}

export async function getBookshelfPostBySlug(slug: string) {
  assertSafeSlug(slug);

  const baseKey = postBaseKey(slug);
  const [metadataRaw, content] = await Promise.all([
    getR2TextObject(`${baseKey}/metadata.json`),
    getR2TextObject(`${baseKey}/index.mdx`),
  ]);

  if (!metadataRaw || !content) {
    return null;
  }

  const metadata = JSON.parse(metadataRaw) as BookshelfPostMetadata;

  if (!metadata.published) {
    return null;
  }

  return {
    ...normalizeMetadata(metadata),
    content,
  } satisfies BookshelfPost;
}

export async function getAdminBookshelfPostBySlug(slug: string) {
  assertSafeSlug(slug);

  const baseKey = postBaseKey(slug);
  const [metadataRaw, content] = await Promise.all([
    getR2TextObject(`${baseKey}/metadata.json`),
    getR2TextObject(`${baseKey}/index.mdx`),
  ]);

  if (!metadataRaw || !content) {
    return null;
  }

  return {
    ...(JSON.parse(metadataRaw) as BookshelfPostMetadata),
    content,
  } satisfies BookshelfPost;
}

export async function createBookshelfPost(input: BookshelfPostInput) {
  const posts = await getBookshelfIndex();
  const slug = input.slug.trim();

  assertSafeSlug(slug);

  if (posts.some((post) => post.slug === slug)) {
    throw new Error("A bookshelf post with this slug already exists.");
  }

  const metadata = createMetadata(input);
  const baseKey = postBaseKey(slug);

  await Promise.all([
    putR2Object(`${baseKey}/metadata.json`, JSON.stringify(metadata, null, 2), "application/json; charset=utf-8"),
    putR2Object(`${baseKey}/index.mdx`, input.content, "text/markdown; charset=utf-8"),
  ]);
  await saveBookshelfIndex([...posts, metadata]);

  return { ...normalizeMetadata(metadata), content: input.content } satisfies BookshelfPost;
}

export async function updateBookshelfPost(slug: string, input: BookshelfPostInput) {
  assertSafeSlug(slug);

  if (input.slug !== slug) {
    assertSafeSlug(input.slug);
  }

  const posts = await getBookshelfIndex();
  const current = posts.find((post) => post.slug === slug);

  if (!current) {
    throw new Error("Bookshelf post not found.");
  }

  if (input.slug !== slug && posts.some((post) => post.slug === input.slug)) {
    throw new Error("A bookshelf post with the new slug already exists.");
  }

  const metadata = createMetadata(input, current);
  const oldBaseKey = postBaseKey(slug);
  const newBaseKey = postBaseKey(metadata.slug);

  await Promise.all([
    putR2Object(`${newBaseKey}/metadata.json`, JSON.stringify(metadata, null, 2), "application/json; charset=utf-8"),
    putR2Object(`${newBaseKey}/index.mdx`, input.content, "text/markdown; charset=utf-8"),
  ]);

  if (metadata.slug !== slug) {
    await Promise.all([deleteR2Object(`${oldBaseKey}/metadata.json`), deleteR2Object(`${oldBaseKey}/index.mdx`)]);
  }

  await saveBookshelfIndex(posts.map((post) => (post.slug === slug ? metadata : post)));

  return { ...normalizeMetadata(metadata), content: input.content } satisfies BookshelfPost;
}

export async function deleteBookshelfPost(slug: string) {
  assertSafeSlug(slug);

  const posts = await getBookshelfIndex();
  const baseKey = postBaseKey(slug);
  const objects = await listR2Objects(`${baseKey}/`);

  await Promise.all(objects.map((object) => deleteR2Object(object.key)));
  await saveBookshelfIndex(posts.filter((post) => post.slug !== slug));
}

async function setBookshelfPostPublishedStatus(slug: string, published: boolean) {
  assertSafeSlug(slug);

  const posts = await getBookshelfIndex();
  const current = posts.find((post) => post.slug === slug);

  if (!current) {
    throw new Error("Bookshelf post not found.");
  }

  const metadata = {
    ...current,
    published,
    updatedAt: new Date().toISOString().slice(0, 10),
  } satisfies BookshelfPostMetadata;
  const baseKey = postBaseKey(slug);
  const content = await getR2TextObject(`${baseKey}/index.mdx`);

  if (!content) {
    throw new Error("Bookshelf post content not found.");
  }

  await Promise.all([
    putR2Object(`${baseKey}/metadata.json`, JSON.stringify(metadata, null, 2), "application/json; charset=utf-8"),
    saveBookshelfIndex(posts.map((post) => (post.slug === slug ? metadata : post))),
  ]);

  return { ...normalizeMetadata(metadata), content } satisfies BookshelfPost;
}

export async function publishBookshelfPost(slug: string) {
  return setBookshelfPostPublishedStatus(slug, true);
}

export async function unpublishBookshelfPost(slug: string) {
  return setBookshelfPostPublishedStatus(slug, false);
}

export async function getRelatedBookshelfPosts(slug: string, limit = 3) {
  const current = await getBookshelfPostBySlug(slug);

  if (!current) {
    return [];
  }

  const posts = await getPublishedBookshelfPosts();
  return posts
    .filter((post) => post.slug !== slug)
    .map((post) => ({
      post,
      score: Number(post.topic === current.topic) + post.tags.filter((tag) => current.tags.includes(tag)).length,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ post }) => post);
}

export async function getBookshelfPostsForPublicPage() {
  try {
    return await getPublishedBookshelfPosts();
  } catch {
    return getPublishedShelfPosts();
  }
}
