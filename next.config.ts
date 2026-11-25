import type { NextConfig } from "next";

const LEGACY_PATHS = ["/cursos/:path*", "/desafios/:path*", "/metas"];

// Every page lives under /pt, /en or /es and is static; old links and "/" go to a language.
const serverConfig: NextConfig = {
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

// GitHub Pages only serves files: no redirects (public/index.html picks the language) and no image optimizer.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH;
const pagesConfig: NextConfig = { output: "export", basePath, trailingSlash: true, images: { unoptimized: true } };

export default basePath ? pagesConfig : serverConfig;
