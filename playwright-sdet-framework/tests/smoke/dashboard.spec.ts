import { test, expect } from "@playwright/test";
import { apiLogin } from "../../utils/apiLogin";

test("dashboard should load after API login @smoke", async ({ page }) => {
  const apiContext = await apiLogin();

  // reuse cookies/session in browser
  const storage = await apiContext.storageState();
  await page.context().addCookies(storage.cookies);

  await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index");

  await expect(page.locator("h6")).toContainText(/Dashboard|Cockpit/);
});
