import "server-only";

export const allowedUploadTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/gif", "application/pdf", "text/plain", "application/zip"]);
export const maxUploadBytes = 4 * 1024 * 1024;

const dangerousExtensions = new Set(["exe", "sh", "bat", "cmd", "msi", "ps1", "js"]);
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function safeUploadFilename(filename: string) {
  const cleaned = filename
    .normalize("NFKD")
    .replace(/[^\w.\-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
  return cleaned || `upload-${Date.now()}`;
}

export function createUploadObjectKey(filename: string, contentType: string, scope?: string, slug?: string) {
  const now = new Date();
  const yyyy = String(now.getUTCFullYear());
  const mm = String(now.getUTCMonth() + 1).padStart(2, "0");
  const safe = safeUploadFilename(filename);
  const extension = safe.split(".").pop() ?? "";

  if (dangerousExtensions.has(extension)) {
    throw new Error("This file type is not allowed.");
  }

  if (scope === "bookshelf-post") {
    if (!slug || !slugPattern.test(slug)) {
      throw new Error("A valid post slug is required for post attachments.");
    }

    return `bookshelf/posts/${slug}/attachments/${Date.now()}-${safe}`;
  }

  const folder = contentType.startsWith("image/") ? "uploads/images" : "uploads/files";
  return `${folder}/${yyyy}/${mm}/${Date.now()}-${safe}`;
}

export function validateUploadInput(input: { filename?: string; contentType?: string; size?: number }) {
  const filename = input.filename?.trim();
  const contentType = input.contentType?.trim();
  const size = Number(input.size ?? 0);

  if (!filename || !contentType || !allowedUploadTypes.has(contentType)) {
    throw new Error("Unsupported file type.");
  }

  if (!Number.isFinite(size) || size <= 0 || size > maxUploadBytes) {
    throw new Error(`Invalid file size. Max upload size is ${Math.floor(maxUploadBytes / 1024 / 1024)}MB.`);
  }

  return { filename, contentType, size };
}
