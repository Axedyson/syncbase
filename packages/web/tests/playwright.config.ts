import { devices } from "@playwright/test";
import type { PlaywrightTestConfig } from "@playwright/test";

const webPort = "3002";

// Remember to run "yarn workspace @syncbase/server dev-e2e " or "... start-e2e" in another tab to start
// the server in playwright mode before running "yarn workspace @syncbase/web test". When the next
// playwright update arrives we will be able to run multiple servers using the config options below
// which will provide much better DX! And when that finally happens you can remove the "dev-e2e" and
// "start-e2e" scripts in the /server/package.json file!
const command = `yarn workspace @syncbase/web ${
  process.env.CI ? "start" : "dev"
}`;

export default {
  testMatch: /\/tests\/.+\.test\.ts$/,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? "github" : "list",
  webServer: {
    command,
    url: `http://localhost:${webPort}`,
    env: {
      NEXT_PUBLIC_SERVER_PORT: "8082",
      PORT: webPort,
    },
  },
  use: {
    baseURL: `http://localhost:${webPort}`,
    trace: "on-first-retry",
  },
  workers: 1,
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    // Not sure why it doesn't work on firefox right now, gotta fix that later!
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],
} as PlaywrightTestConfig;
