import { expect, test } from "@playwright/test";

test("basic test", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Syncbase/);
  const email = "Bob@gmail.com";

  await page.click("text='Create Account'");
  await page.fill("#name", "Bob");
  await page.fill("#email", email);
  await page.fill("#password", "1234567");
  await page.locator("button").first().click();
  await page.click("text='Account page'");
  await expect(page.isVisible(`text='${email}'`)).toBe(true);
});
