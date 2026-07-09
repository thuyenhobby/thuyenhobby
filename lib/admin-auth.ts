import "server-only";
import type { NextRequest } from "next/server";

export function assertAdminRequest(request: NextRequest) {
  const adminSecret = process.env.ADMIN_SECRET?.trim();

  if (!adminSecret) {
    return Response.json({ error: "ADMIN_SECRET is not configured." }, { status: 500 });
  }

  const authorization = request.headers.get("authorization");
  const token = authorization?.startsWith("Bearer ") ? authorization.slice("Bearer ".length).trim() : "";

  if (token !== adminSecret) {
    return Response.json({ error: "Unauthorized." }, { status: 401 });
  }

  return null;
}
