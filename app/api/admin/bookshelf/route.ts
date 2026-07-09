import { revalidatePath } from "next/cache";
import type { NextRequest } from "next/server";
import { assertAdminRequest } from "@/lib/admin-auth";
import { createBookshelfPost, getBookshelfIndex } from "@/lib/bookshelf-r2";
import type { BookshelfPostInput } from "@/types/bookshelf";

export const runtime = "nodejs";

function parseInput(value: unknown): BookshelfPostInput {
  const input = value as Partial<BookshelfPostInput>;

  if (!input.title || !input.slug || !input.description || !input.topic || !input.content) {
    throw new Error("Missing required post fields.");
  }

  return {
    title: String(input.title),
    slug: String(input.slug),
    description: String(input.description),
    topic: String(input.topic),
    tags: Array.isArray(input.tags) ? input.tags.map(String) : [],
    content: String(input.content),
    coverImage: input.coverImage ? String(input.coverImage) : undefined,
    published: Boolean(input.published),
    featured: Boolean(input.featured),
  };
}

export async function GET(request: NextRequest) {
  const unauthorized = assertAdminRequest(request);
  if (unauthorized) return unauthorized;

  try {
    return Response.json({ posts: await getBookshelfIndex() });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Failed to load bookshelf posts." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const unauthorized = assertAdminRequest(request);
  if (unauthorized) return unauthorized;

  try {
    const input = parseInput(await request.json());
    const post = await createBookshelfPost(input);

    revalidatePath("/bookshelf");
    revalidatePath(`/bookshelf/${post.slug}`);

    return Response.json({ post }, { status: 201 });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Failed to create bookshelf post." }, { status: 400 });
  }
}
