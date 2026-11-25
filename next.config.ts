import type { NextConfig } from "next";

// GitHub Pages serves plain files under https://<user>.github.io/q-learning: no redirects (public/index.html picks
// the language) and no image optimizer. The export goes to dist/q-learning so that dist/ can be served locally.
const basePath = "/q-learning";

const nextConfig: NextConfig = {
  output: "export",
  distDir: "dist/q-learning",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
