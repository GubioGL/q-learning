// Files of public/ live under the site's base path: "" on Vercel, "/q-learning" on GitHub Pages (next.config.ts).
export const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
