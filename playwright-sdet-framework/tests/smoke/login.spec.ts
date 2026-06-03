import { test, expect } from "@playwright/test";

test.describe.configure({ mode: 'parallel' });

test('test1', async ({ page }) => {
  // runs in parallel
});

test('test2', async ({ page }) => {
  // runs in parallel
});
test("Logged In Successfully", async ({ page }) => {

  await page.goto("https://practicetestautomation.com/practice-test-login/");

  await page.locator('#username').fill('student');
  await page.locator('#password').fill('Password123');
  await page.locator('#submit').click();

   await expect(page.locator('.post-title'))
    .toHaveText('Logged In Successfully');

    await page.locator('.wp-block-button__link').click();

  // Validate logout
 await expect(page).toHaveURL(/practice-test-login/);
  await expect(page.locator('#submit')).toBeVisible();
})