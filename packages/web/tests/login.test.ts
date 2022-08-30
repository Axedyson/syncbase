import { exec as child_process_exec } from "child_process";
import util from "util";
import { expect, test } from "@playwright/test";

const exec = util.promisify(child_process_exec);

const accountData = {
  email: "Bob@mail.com",
  name: "Bob",
  password: "1234567",
};

test.describe.serial("User login features", () => {
  test.beforeAll(() => {
    return exec(
      "NODE_ENV=test yarn workspace @syncbase/server mikro-orm migration:fresh --seed"
    );
  });

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Syncbase/);
  });

  test("create account", async ({ page }) => {
    await page.locator('button:has-text("Create Account")').click();
    await page.locator('input[name="name"]').click();
    await page.locator('input[name="name"]').fill(accountData.name);
    await page.locator('input[name="name"]').press("Tab");
    await page.locator('input[name="email"]').fill(accountData.email);
    await page.locator('input[name="email"]').press("Tab");
    await page.locator('input[name="password"]').fill(accountData.password);
    await page
      .locator('div[role="tabpanel"] button:has-text("Create Account")')
      .click();

    // Wait for login dialog to be detached (removed from the DOM) before doing anything else
    await page
      .locator("#headlessui-portal-root")
      .waitFor({ state: "detached" });

    await expect(page.locator("text=You're logged in")).toBeVisible();
    await page.locator('button:has-text("Log Out")').click();
    await expect(page.locator("text=You're not logged in")).toBeVisible();
  });

  test("login & logout", async ({ page }) => {
    await page.locator('button:has-text("Log In")').click();
    await page.locator("text=Login").click();
    await page.locator('input[name="email"]').click();
    await page.locator('input[name="email"]').fill(accountData.email);
    await page.locator('input[name="email"]').press("Tab");
    await page.locator('input[name="password"]').fill(accountData.password);
    await page
      .locator('div[role="tabpanel"] button:has-text("Log In")')
      .click();

    // Wait for login dialog to be detached (removed from the DOM) before doing anything else
    await page
      .locator("#headlessui-portal-root")
      .waitFor({ state: "detached" });

    await Promise.all([
      page.waitForNavigation({ url: "/account" }),
      page.locator("text=Account").click(),
    ]);

    await expect(
      page.locator(`text=Username: ${accountData.name}`)
    ).toBeVisible();
    await expect(
      page.locator(`text=Email: ${accountData.email}`)
    ).toBeVisible();

    await expect(page.locator("text=You're logged in")).toBeVisible();
    await page.locator("text=Feed").click();
    await expect(page).toHaveURL("/");
    await expect(page.locator("text=You're logged in")).toBeVisible();
    await page.locator('button:has-text("Log Out")').click();
  });
});
