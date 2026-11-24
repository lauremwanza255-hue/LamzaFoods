import { expect, test } from '@playwright/test';

test.describe('homepage', () => {
  test('sections and featured products appear in the reference order', async ({ page }) => {
    await page.goto('/');
    const sections = await page.locator('main > section').evaluateAll((els) =>
      els.map((e) => e.getAttribute('aria-labelledby') || e.getAttribute('aria-label')),
    );
    expect(sections).toEqual(['hero-title', 'Why businesses work with Lamza Foods', 'products-title', 'about-title', 'benefits-title', 'partner-title']);
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
    const names = await page.locator('section[aria-labelledby="products-title"] ul h3').allInnerTexts();
    expect(names).toEqual([
      'Dried & Smoked Catfish',
      'Dried Lake Malawi Sardines (Usipa)',
      'Cassava Flour',
      'Baobab Powder',
      'African Spices',
      'Edible Dried Caterpillars',
    ]);
  });

  test('uses the official logo artwork, brand colours and fonts', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('header img[src="/brand/logo-primary.svg"]')).toBeVisible();
    await expect(page.locator('footer img[src="/brand/logo-dark.svg"]')).toBeVisible();
    const hero = page.locator('section[aria-labelledby="hero-title"]');
    expect(await hero.evaluate((e) => getComputedStyle(e).backgroundColor)).toBe('rgb(26, 36, 83)');
    const btn = page.getByRole('link', { name: 'Explore our products' });
    expect(await btn.evaluate((e) => getComputedStyle(e).backgroundColor)).toBe('rgb(56, 133, 63)');
    expect(await page.locator('body').evaluate((e) => getComputedStyle(e).fontFamily)).toMatch(/Hind Siliguri|hindSiliguri/);
    expect(await page.locator('h1').evaluate((e) => getComputedStyle(e).fontFamily)).toMatch(/Libre Baskerville|libreBaskerville/);
    await page.evaluate(() => document.fonts.ready);
    const loaded = await page.evaluate(() => [...document.fonts].filter((f) => f.status === 'loaded').map((f) => f.family));
    expect(loaded.some((f) => /hind/i.test(f))).toBe(true);
    expect(loaded.some((f) => /baskerville/i.test(f))).toBe(true);
  });

  for (const width of [1920, 1440, 1280, 1024, 768, 390, 375, 320]) {
    test(`has no horizontal overflow at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('/');
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow).toBeLessThanOrEqual(0);
    });
  }

  test('hero buttons link to the catalogue and the partner page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Explore our products' }).click();
    await expect(page).toHaveURL(/\/products$/);
    await page.goto('/');
    await page.getByRole('link', { name: 'Partner with us' }).click();
    await expect(page).toHaveURL(/\/become-a-partner$/);
  });
});
