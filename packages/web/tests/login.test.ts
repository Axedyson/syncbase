import { expect, test } from "@playwright/test";

test("basic test", async ({ page }) => {
  await page.goto("http://localhost:3000");
  const title = page.locator("text=Lol");
  await expect(title).toHaveAttribute("data-id", "lol");
});
