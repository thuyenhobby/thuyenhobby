import type { NextRequest } from "next/server";
import { assertAdminRequest } from "@/lib/admin-auth";
import { getR2PublicUrl, objectExists } from "@/lib/r2-server";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const unauthorized = assertAdminRequest(request);
  if (unauthorized) return unauthorized;

  try {
    const body = (await request.json()) as { key?: string };
    const key = body.key?.trim();

    if (!key || key.includes("..") || key.startsWith("/")) {
      return Response.json({ error: "Invalid upload key." }, { status: 400 });
    }

    if (!(await objectExists(key))) {
      return Response.json({ error: "Uploaded object was not found." }, { status: 404 });
    }

    return Response.json({ key, publicUrl: getR2PublicUrl(key) });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Failed to complete upload." }, { status: 400 });
  }
}
