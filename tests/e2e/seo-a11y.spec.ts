import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const pages = ['/', '/products', '/products/cassava-flour', '/about', '/our-process', '/markets', '/markets/wholesale', '/news', '/contact', '/become-a-partner', '/request-a-quote', '/faqs', '/certifications', '/privacy-policy'];

for (const path of pages) {
  test(`axe: no serious accessibility violations on ${path}`, async ({ page }) => {
    await page.goto(path);
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
    const serious = results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
    expect(serious.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).slice(0, 3).join(' | ')}`)).toEqual([]);
  });
}

test('pages have unique titles, descriptions and canonical URLs', async ({ page }) => {
  const seen = new Set<string>();
  for (const path of pages) {
    await page.goto(path);
    const title = await page.title();
    expect(title.length, path).toBeGreaterThan(10);
    expect(seen.has(title), `duplicate title ${title}`).toBe(false);
    seen.add(title);
    expect(await page.locator('meta[name="description"]').getAttribute('content'), path).toBeTruthy();
    expect(await page.locator('link[rel="canonical"]').getAttribute('href'), path).toMatch(new RegExp(`${path === '/' ? '/?' : path}$`));
    expect(await page.locator('meta[property="og:image"]').count(), path).toBeGreaterThan(0);
    await expect(page.locator('h1')).toHaveCount(1);
  }
});

test('homepage title and structured data', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('Lamza Foods | Authentic African Food Products & Global Supply');
  const ld = await page.locator('script[type="application/ld+json"]').allInnerTexts();
  expect(ld.some((s) => JSON.parse(s)['@type'] === 'Organization')).toBe(true);
});

test('staging stays out of search indexes by default', async ({ page, request }) => {
  await page.goto('/');
  expect(await page.locator('meta[name="robots"]').getAttribute('content')).toContain('noindex');
  const robots = await (await request.get('/robots.txt')).text();
  expect(robots).toContain('Disallow: /');
  const sitemap = await (await request.get('/sitemap.xml')).text();
  expect(sitemap).toContain('/products/dried-lake-malawi-sardines-usipa');
  expect(sitemap).not.toContain('what-is-baobab-powder'); // drafts are not listed
});

test('draft articles are not published in production', async ({ page }) => {
  const res = await page.goto('/news/what-is-baobab-powder');
  expect(res?.status()).toBe(404);
  await page.goto('/news');
  await expect(page.getByText('Articles are on their way')).toBeVisible();
});

test('security headers are present', async ({ request }) => {
  const res = await request.get('/');
  const h = res.headers();
  expect(h['content-security-policy']).toContain("frame-ancestors 'none'");
  expect(h['x-content-type-options']).toBe('nosniff');
  expect(h['referrer-policy']).toBe('strict-origin-when-cross-origin');
  expect(h['x-powered-by']).toBeUndefined();
});

test('images have alt text and below-the-fold images are lazy', async ({ page }) => {
  await page.goto('/');
  const missing = await page.locator('img:not([alt])').count();
  expect(missing).toBe(0);
  const heroImg = page.locator('section[aria-labelledby="hero-title"] img');
  await expect(heroImg).not.toHaveAttribute('loading', 'lazy');
  const farm = page.locator('section[aria-labelledby="about-title"] img');
  await expect(farm).toHaveAttribute('loading', 'lazy');
});
