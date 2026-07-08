import type { NextConfig } from "next";

function getR2RemotePattern() {
  const publicUrl = process.env.NEXT_PUBLIC_R2_PUBLIC_URL;
  const fallbackR2Hostnames = ["pub-ba94ef14a2fc4c458bd151676c56df46.r2.dev"];
  const patterns: NonNullable<NextConfig["images"]>["remotePatterns"] = fallbackR2Hostnames.map(
    (hostname) => ({
      protocol: "https",
      hostname,
      pathname: "/**",
    }),
  );

  if (!publicUrl) {
    return patterns;
  }

  try {
    const url = new URL(publicUrl);

    if (!patterns.some((pattern) => pattern.hostname === url.hostname)) {
      patterns.push({
        protocol: url.protocol.replace(":", "") as "http" | "https",
        hostname: url.hostname,
        port: url.port,
        pathname: "/**",
      });
    }
  } catch {
    return patterns;
  }

  return patterns;
}

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    remotePatterns: getR2RemotePattern(),
  },
};

export default nextConfig;
