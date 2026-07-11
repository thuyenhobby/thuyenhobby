import type { NextRequest } from "next/server";
import { assertAdminRequest } from "@/lib/admin-auth";
import { createUploadObjectKey, validateUploadInput } from "@/lib/admin-upload";
import { getR2PublicUrl, putR2Object } from "@/lib/r2-server";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const unauthorized = assertAdminRequest(request);
  if (unauthorized) return unauthorized;

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return Response.json({ error: "Missing upload file." }, { status: 400 });
    }

    const contentType = file.type || "application/octet-stream";
    const { filename } = validateUploadInput({
      filename: file.name,
      contentType,
      size: file.size,
    });
    const scope = typeof formData.get("scope") === "string" ? String(formData.get("scope")).trim() : undefined;
    const slug = typeof formData.get("slug") === "string" ? String(formData.get("slug")).trim() : undefined;
    const key = createUploadObjectKey(filename, contentType, scope, slug);
    const bytes = new Uint8Array(await file.arrayBuffer());

    await putR2Object(key, bytes, contentType);

    return Response.json({ key, publicUrl: getR2PublicUrl(key) });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Failed to upload file." }, { status: 400 });
  }
}
