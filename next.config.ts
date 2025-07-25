import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['@clerk/nextjs'],
  },
  images: {
    domains: ['images.clerk.dev'],
  },
};

export default nextConfig;
