import { devices } from "@playwright/test";
import type { PlaywrightTestConfig } from "@playwright/test";

const launchScript = process.env.CI ? "start" : "dev";
const testWebPort = 3000;

export default {
  testMatch: /\/tests\/.+\.test\.ts$/,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  outputDir: "./test-results",
  reporter: process.env.CI ? "github" : "list",
  webServer: [
    {
      command: `yarn workspace @syncbase/web next ${launchScript}`,
      env: { NEXT_PUBLIC_IS_TEST: "1", PORT: testWebPort },
      port: testWebPort,
    },
    {
      command: `yarn workspace @syncbase/server ${launchScript}`,
      env: { NODE_ENV: "test" },
      port: 8082,
    },
  ],
  use: {
    baseURL: `http://localhost:${testWebPort}`,
    trace: process.env.CI ? "on-first-retry" : "retain-on-failure",
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
} as PlaywrightTestConfig;
