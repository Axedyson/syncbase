import { devices } from "@playwright/test";
import type { PlaywrightTestConfig } from "@playwright/test";

// The code in this file is a bit finicky but it works, will update all of this when the next playwright update arrives!
const webPort = "3002";
const url = `http://localhost:${process.env.CI ? "3000" : webPort}`;

// Remember to run "yarn workspace @syncbase/server dev:e2e " in another tab to start
// the server in playwright mode before running "yarn workspace @syncbase/web test". When the next
// playwright update arrives we will be able to run multiple servers using the config options below
// which will provide much better DX! And when that finally happens you can remove the "dev:e2e"
// script in the /server/package.json file!

const command = `yarn workspace @syncbase/web ${
  process.env.CI ? "start" : "dev"
}`;

const env = process.env.CI
  ? undefined
  : {
      NEXT_PUBLIC_SERVER_PORT: "8082",
      PORT: webPort,
    };

export default {
  testMatch: /\/tests\/.+\.test\.ts$/,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? "github" : "list",
  webServer: {
    command,
    url,
    env,
  },
  use: {
    baseURL: url,
    trace: "on-first-retry",
  },
  workers: 1,
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
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
