import { revalidatePath } from "next/cache";
import type { NextRequest } from "next/server";
import { assertAdminRequest } from "@/lib/admin-auth";
import { deleteBookshelfPost, getAdminBookshelfPostBySlug, publishBookshelfPost, unpublishBookshelfPost, updateBookshelfPost } from "@/lib/bookshelf-r2";
import type { BookshelfPostInput } from "@/types/bookshelf";

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

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

export async function GET(request: NextRequest, context: RouteContext) {
  const unauthorized = assertAdminRequest(request);
  if (unauthorized) return unauthorized;

  try {
    const { slug } = await context.params;
    const post = await getAdminBookshelfPostBySlug(slug);

    if (!post) {
      return Response.json({ error: "Post not found." }, { status: 404 });
    }

    return Response.json({ post });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Failed to load bookshelf post." }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, context: RouteContext) {
  const unauthorized = assertAdminRequest(request);
  if (unauthorized) return unauthorized;

  try {
    const { slug } = await context.params;
    const input = parseInput(await request.json());
    const post = await updateBookshelfPost(slug, input);

    revalidatePath("/post");
    revalidatePath(`/post/${slug}`);
    revalidatePath(`/post/${post.slug}`);

    return Response.json({ post });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Failed to update bookshelf post." }, { status: 400 });
  }
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  const unauthorized = assertAdminRequest(request);
  if (unauthorized) return unauthorized;

  try {
    const { slug } = await context.params;
    const body = (await request.json()) as { action?: unknown };
    const action = String(body.action ?? "");

    if (action !== "publish" && action !== "unpublish") {
      return Response.json({ error: "Invalid bookshelf action." }, { status: 400 });
    }

    const post = action === "publish" ? await publishBookshelfPost(slug) : await unpublishBookshelfPost(slug);

    revalidatePath("/post");
    revalidatePath(`/post/${slug}`);

    return Response.json({ post });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Failed to update bookshelf status." }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  const unauthorized = assertAdminRequest(request);
  if (unauthorized) return unauthorized;

  try {
    const { slug } = await context.params;
    await deleteBookshelfPost(slug);

    revalidatePath("/post");
    revalidatePath(`/post/${slug}`);

    return Response.json({ ok: true });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Failed to delete bookshelf post." }, { status: 400 });
  }
}
