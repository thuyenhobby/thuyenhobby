import type { NextRequest } from "next/server";
import { assertAdminRequest } from "@/lib/admin-auth";
import { createR2PresignedPutUrl, getR2PublicUrl } from "@/lib/r2-server";

export const runtime = "nodejs";

const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/gif", "application/pdf", "text/plain", "application/zip"]);
const dangerousExtensions = new Set(["exe", "sh", "bat", "cmd", "msi", "ps1", "js"]);
const maxUploadBytes = 15 * 1024 * 1024;
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function safeFilename(filename: string) {
  const cleaned = filename
    .normalize("NFKD")
    .replace(/[^\w.\-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
  return cleaned || `upload-${Date.now()}`;
}

function objectKey(filename: string, contentType: string, scope?: string, slug?: string) {
  const now = new Date();
  const yyyy = String(now.getUTCFullYear());
  const mm = String(now.getUTCMonth() + 1).padStart(2, "0");
  const safe = safeFilename(filename);
  const extension = safe.split(".").pop() ?? "";

  if (dangerousExtensions.has(extension)) {
    throw new Error("This file type is not allowed.");
  }

  if (scope === "bookshelf-post") {
    if (!slug || !slugPattern.test(slug)) {
      throw new Error("A valid post slug is required for bookshelf attachments.");
    }

    return `bookshelf/posts/${slug}/attachments/${Date.now()}-${safe}`;
  }

  const folder = contentType.startsWith("image/") ? "uploads/images" : "uploads/files";
  return `${folder}/${yyyy}/${mm}/${Date.now()}-${safe}`;
}

export async function POST(request: NextRequest) {
  const unauthorized = assertAdminRequest(request);
  if (unauthorized) return unauthorized;

  try {
    const body = (await request.json()) as { filename?: string; contentType?: string; size?: number; scope?: string; slug?: string };
    const filename = body.filename?.trim();
    const contentType = body.contentType?.trim();
    const size = Number(body.size ?? 0);
    const scope = body.scope?.trim();
    const slug = body.slug?.trim();

    if (!filename || !contentType || !allowedTypes.has(contentType)) {
      return Response.json({ error: "Unsupported file type." }, { status: 400 });
    }

    if (!Number.isFinite(size) || size <= 0 || size > maxUploadBytes) {
      return Response.json({ error: "Invalid file size." }, { status: 400 });
    }

    const key = objectKey(filename, contentType, scope, slug);

    return Response.json({
      uploadUrl: createR2PresignedPutUrl(key, 300),
      key,
      publicUrl: getR2PublicUrl(key),
    });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Failed to create upload URL." }, { status: 400 });
  }
}
