import { expect, test } from '@playwright/test';

test('mobile menu opens, locks scroll, expands products and closes on Escape', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('header').getByRole('link', { name: 'Become a Partner' })).toBeHidden();
  const toggle = page.getByRole('button', { name: 'Open menu' });
  await toggle.click();
  await expect(page.getByRole('button', { name: 'Close menu' })).toHaveAttribute('aria-expanded', 'true');
  expect(await page.evaluate(() => document.body.classList.contains('menu-open'))).toBe(true);
  const panel = page.locator('header nav[aria-label="Main"]').last();
  await panel.getByRole('button', { name: 'Products' }).click();
  await expect(panel.getByRole('link', { name: 'African Spices' })).toBeVisible();
  await expect(panel.getByRole('link', { name: 'Become a Partner' })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('button', { name: 'Open menu' })).toHaveAttribute('aria-expanded', 'false');
  expect(await page.evaluate(() => document.body.classList.contains('menu-open'))).toBe(false);
});

test('mobile menu navigates', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Open menu' }).click();
  await page.locator('header nav[aria-label="Main"]').last().getByRole('link', { name: 'Contact Us' }).click();
  await expect(page).toHaveURL(/\/contact$/);
  await expect(page.getByRole('button', { name: 'Open menu' })).toBeVisible();
});

test('controls are touch sized and nothing overflows', async ({ page }) => {
  for (const path of ['/', '/products', '/become-a-partner', '/request-a-quote']) {
    await page.goto(path);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow, path).toBeLessThanOrEqual(0);
    const small = await page.locator('main .btn, main button, main input:not([type=checkbox]):not([type=hidden]), main select').evaluateAll((els) =>
      els.filter((e) => (e as HTMLElement).offsetParent && e.getBoundingClientRect().height < 40 && !e.closest('[aria-hidden="true"]')).map((e) => e.outerHTML.slice(0, 80)),
    );
    expect(small, path).toEqual([]);
  }
});
