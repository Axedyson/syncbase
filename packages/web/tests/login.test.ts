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
      "usePlaywrightDB=1 yarn workspace @syncbase/server mikro-orm schema:fresh --seed --run"
    );
  });

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Syncbase/);
  });

  test("create account", async ({ page }) => {
    // Click button:has-text("Create Account")
    await page.locator('button:has-text("Create Account")').click();
    // Click input[name="name"]
    await page.locator('input[name="name"]').click();
    // Fill input[name="name"]
    await page.locator('input[name="name"]').fill(accountData.name);
    // Press Tab
    await page.locator('input[name="name"]').press("Tab");
    // Fill input[name="email"]
    await page.locator('input[name="email"]').fill(accountData.email);
    // Press Tab
    await page.locator('input[name="email"]').press("Tab");
    // Fill input[name="password"]
    await page.locator('input[name="password"]').fill(accountData.password);
    // Click div[role="tabpanel"] button:has-text("Create Account")
    await page
      .locator('div[role="tabpanel"] button:has-text("Create Account")')
      .click();

    // Wait for login dialog to be detached (removed from the DOM) before doing anything else
    await page
      .locator("#headlessui-portal-root")
      .waitFor({ state: "detached" });

    // Click text=This is the index page and you`re logged in
    await expect(
      page.locator("text=This is the index page and you`re logged in")
    ).toBeVisible();
    // Click button:has-text("Logout")
    await page.locator('button:has-text("Logout")').click();
    // Click text=You`re not logged in...
    await expect(page.locator("text=You're not logged in...")).toBeVisible();
  });

  test("login & logout", async ({ page }) => {
    // Click button:has-text("Log In")
    await page.locator('button:has-text("Log In")').click();
    // Click text=Login
    await page.locator("text=Login").click();
    // Click input[name="email"]
    await page.locator('input[name="email"]').click();
    // Fill input[name="email"]
    await page.locator('input[name="email"]').fill(accountData.email);
    // Press Tab
    await page.locator('input[name="email"]').press("Tab");
    // Fill input[name="password"]
    await page.locator('input[name="password"]').fill(accountData.password);
    // Click div[role="tabpanel"] button:has-text("Login")
    await page.locator('div[role="tabpanel"] button:has-text("Login")').click();

    // Wait for login dialog to be detached (removed from the DOM) before doing anything else
    await page
      .locator("#headlessui-portal-root")
      .waitFor({ state: "detached" });

    await Promise.all([
      page.waitForNavigation({ url: "/account" }),
      page.locator("text=Account page").click(),
    ]);
    // Click text=username: Bob
    await page.locator(`text=username: ${accountData.name}`).click();
    // Click text=email: Bob@mail.com
    await page.locator(`text=email: ${accountData.email}`).click();
    // Click text=This is the account page and you`re logged in
    await page
      .locator("text=This is the account page and you`re logged in")
      .click();
    // Click text=Index page
    await page.locator("text=Index page").click();
    await expect(page).toHaveURL("/");
    // Click text=This is the index page and you`re logged in
    await expect(
      page.locator("text=This is the index page and you`re logged in")
    ).toBeVisible();
    // Click button:has-text("Logout")
    await page.locator('button:has-text("Logout")').click();
  });
});
