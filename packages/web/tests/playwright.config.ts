import { devices } from "@playwright/test";
import type { PlaywrightTestConfig } from "@playwright/test";

const webPort = 3002;
const serverPort = 8081;

const startCommand = process.env.CI ? "start" : "dev";

const startServer = `WEB_PORT=${webPort} PORT=${serverPort} playwright=true yarn workspace @syncbase/server ${startCommand}`;
const startWeb = `SERVER_PORT=${serverPort} PORT=${webPort} yarn workspace @syncbase/web ${startCommand}`;

const command = `${startServer} & ${startWeb}`;

export default {
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? "github" : "list",
  webServer: {
    command,
    url: `http://localhost:${webPort}`,
    timeout: 120 * 1000,
    reuseExistingServer: false,
  },
  use: {
    baseURL: `http://localhost:${webPort}`,
    trace: "on-first-retry",
  },
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
