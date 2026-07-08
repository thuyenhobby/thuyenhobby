const r2PublicBaseUrl = process.env.NEXT_PUBLIC_R2_PUBLIC_URL?.trim();
let hasWarnedMissingR2PublicUrl = false;

export function normalizeR2Path(path: string): string {
  return path.trim().replace(/^\/+/, "").replace(/\/+$/, "");
}

export function getR2PublicUrl(path: string): string {
  const trimmedPath = path.trim();

  if (/^https?:\/\//i.test(trimmedPath)) {
    return trimmedPath;
  }

  const normalizedPath = normalizeR2Path(trimmedPath);

  if (!r2PublicBaseUrl) {
    if (process.env.NODE_ENV === "development" && !hasWarnedMissingR2PublicUrl) {
      console.warn("NEXT_PUBLIC_R2_PUBLIC_URL is not configured. Falling back to a relative asset path.");
      hasWarnedMissingR2PublicUrl = true;
    }

    return `/${normalizedPath}`;
  }

  return `${r2PublicBaseUrl.replace(/\/+$/, "")}/${normalizedPath}`;
}

export function hasR2PublicUrl() {
  return Boolean(r2PublicBaseUrl);
}

export function isRemoteAssetUrl(url: string | undefined) {
  return Boolean(url && /^https?:\/\//i.test(url));
}
