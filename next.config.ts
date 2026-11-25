import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['@clerk/nextjs'],
  },
  images: {
    domains: ['images.clerk.dev'],
  },
  // skill pages read content/skills/**/*.md at request time
  outputFileTracingIncludes: {
    '/cursos/**': ['./content/skills/**/*.md'],
  },
};

export default nextConfig;
