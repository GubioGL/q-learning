import { defineConfig } from "@playwright/test";

// npm run test:e2e  — builds nothing; start the app first (npm run build && npm start) or set BASE_URL.
// CHROME_PATH lets it use an installed Chrome instead of downloading Playwright's browser.
export default defineConfig({
  testDir: "e2e",
  timeout: 180_000,
  workers: 1,
  use: {
    baseURL: process.env.BASE_URL ?? "http://localhost:3000",
    viewport: { width: 1280, height: 900 },
    launchOptions: process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {},
  },
});
