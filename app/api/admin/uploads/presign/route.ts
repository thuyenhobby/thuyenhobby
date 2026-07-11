import type { NextRequest } from "next/server";
import { assertAdminRequest } from "@/lib/admin-auth";
import { createUploadObjectKey, validateUploadInput } from "@/lib/admin-upload";
import { createR2PresignedPutUrl, getR2PublicUrl } from "@/lib/r2-server";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const unauthorized = assertAdminRequest(request);
  if (unauthorized) return unauthorized;

  try {
    const body = (await request.json()) as { filename?: string; contentType?: string; size?: number; scope?: string; slug?: string };
    const { filename, contentType } = validateUploadInput(body);
    const scope = body.scope?.trim();
    const slug = body.slug?.trim();
    const key = createUploadObjectKey(filename, contentType, scope, slug);

    return Response.json({
      uploadUrl: createR2PresignedPutUrl(key, 300),
      key,
      publicUrl: getR2PublicUrl(key),
    });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Failed to create upload URL." }, { status: 400 });
  }
}
