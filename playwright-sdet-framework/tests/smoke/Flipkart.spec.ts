import { test, expect } from '@playwright/test';

test('select 5th suggestion from Flipkart', async ({ page }) => {

  await page.goto('https://www.flipkart.com');

  // Close popup safely
  const closeBtn = page.locator('button:has-text("✕")');
  if (await closeBtn.isVisible().catch(() => false)) {
    await closeBtn.click();
  }

  // Type search
  await page.locator('input[name="q"]').fill('mobiles');

  const suggestions = page.locator('li._3D0G9a');

  await suggestions.first().waitFor(); // wait for dropdown

  const count = await suggestions.count();
  expect(count).toBeGreaterThan(4);

  await suggestions.nth(4).click();
});