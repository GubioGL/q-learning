import type { NextConfig } from "next";

const LEGACY_PATHS = ["/cursos/:path*", "/desafios/:path*", "/metas"];

const nextConfig: NextConfig = {
  // Every page lives under /pt, /en or /es and is static; old links and "/" go to a language.
  redirects: async () => [
    ...["en", "es"].map((locale) => ({
      source: "/",
      has: [{ type: "header" as const, key: "accept-language", value: `${locale}.*` }],
      destination: `/${locale}`,
      permanent: false,
    })),
    { source: "/", destination: "/pt", permanent: false },
    ...LEGACY_PATHS.map((source) => ({ source, destination: `/pt${source}`, permanent: false })),
  ],
};

export default nextConfig;
