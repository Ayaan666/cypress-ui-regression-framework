import { test } from "@playwright/test";

test("authenticate", async ({ page }) => {
  await page.goto("https://opensource-demo.orangehrmlive.com/");

  await page.fill('input[name="username"]', "Admin");
  await page.fill('input[name="password"]', "admin123");
  await page.click('button[type="submit"]');

  await page.waitForURL(/dashboard/);

  await page.context().storageState({ path: "storageState.json" });
});
