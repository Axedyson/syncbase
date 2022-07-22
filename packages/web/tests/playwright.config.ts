import { devices } from "@playwright/test";
// import type { PlaywrightTestConfig } from "@playwright/test";

const launchScript = process.env.CI ? "start" : "dev";

const config = {
  testMatch: /\/tests\/.+\.test\.ts$/,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? "github" : "list",
  webServer: [
    {
      command: `yarn workspace @syncbase/web next ${launchScript}`,
      port: 3002,
      timeout: 120 * 1000,
      env: { NEXT_PUBLIC_IS_TEST: "1", PORT: "3002" },
    },
    {
      command: `yarn workspace @syncbase/server ${launchScript}`,
      port: 8082,
      timeout: 120 * 1000,
      env: { NODE_ENV: "test" },
    },
  ],
  use: {
    baseURL: "http://localhost:3002",
    trace: "on-first-retry",
  },
  workers: 1,
  projects: [
    {
      name: "Desktop Chrome",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "Desktop Firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "Desktop Safari",
      use: { ...devices["Desktop Safari"] },
    },
  ],
};

export default config;
