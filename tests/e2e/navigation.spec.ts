import { expect, test } from '@playwright/test';

test('products dropdown works with the keyboard and closes on Escape', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/about');
  const trigger = page.locator('header nav').getByRole('button', { name: 'Products' });
  await trigger.focus();
  await page.keyboard.press('Enter');
  await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  const menu = page.getByRole('menu', { name: 'Products' });
  await expect(menu.getByRole('menuitem', { name: 'Dried Fish' })).toBeVisible();
  await page.keyboard.press('ArrowDown');
  await expect(menu.getByRole('menuitem', { name: 'All Products' })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  await expect(trigger).toBeFocused();
  await trigger.click();
  await menu.getByRole('menuitem', { name: 'Flours & Powders' }).click();
  await expect(page).toHaveURL(/\/products\/category\/flours-powders$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Flours & Powders');
});

test('active navigation link is marked', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/markets/canada');
  await expect(page.locator('header nav').getByRole('link', { name: 'Markets' })).toHaveAttribute('aria-current', 'page');
});

test('skip link moves focus to the main content', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  const skip = page.getByRole('link', { name: 'Skip to content' });
  await expect(skip).toBeFocused();
  await expect(skip).toBeInViewport();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#main$/);
});

test('every internal link on the homepage and footer resolves', async ({ page, request }) => {
  await page.goto('/');
  const hrefs = await page.locator('a[href^="/"]').evaluateAll((as) => [...new Set(as.map((a) => a.getAttribute('href')!.split('#')[0]))]);
  expect(hrefs.length).toBeGreaterThan(25);
  for (const href of hrefs) {
    const res = await request.get(href);
    expect(res.status(), href).toBe(200);
  }
});

test('custom 404 page', async ({ page }) => {
  const res = await page.goto('/this-page-does-not-exist');
  expect(res?.status()).toBe(404);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('This page could not be found');
  await expect(page.getByRole('link', { name: 'Go to the homepage' })).toBeVisible();
});
