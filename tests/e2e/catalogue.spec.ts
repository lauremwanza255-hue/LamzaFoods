import { expect, test } from '@playwright/test';

test('search filters products, shows an empty state and resets', async ({ page }) => {
  await page.goto('/products');
  const results = page.locator('#product-results li');
  await expect(results).toHaveCount(6);
  await page.getByLabel('Search products').fill('fish');
  await expect(results).toHaveCount(2);
  await expect(page.getByRole('status').first()).toContainText('Showing 2 products');
  await page.getByLabel('Search products').fill('zzzz');
  await expect(page.getByRole('heading', { name: 'No products match your search' })).toBeVisible();
  await page.locator('#product-results').getByRole('link', { name: 'Clear filters' }).click();
  await expect(page.getByLabel('Search products')).toHaveValue('');
  await expect(results).toHaveCount(6);
});

test('category filter narrows the catalogue', async ({ page }) => {
  await page.goto('/products');
  await page.getByRole('navigation', { name: 'Product categories' }).getByRole('link', { name: 'Flours & Powders' }).click();
  await expect(page).toHaveURL(/category\/flours-powders/);
  await expect(page.locator('#product-results li')).toHaveCount(2);
  await expect(page.locator('#product-results')).toContainText('Cassava Flour');
  await expect(page.locator('#product-results')).toContainText('Baobab Powder');
});

test('product detail page shows honest specifications and preselects the quote', async ({ page }) => {
  await page.goto('/products/baobab-powder');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Baobab Powder');
  await expect(page.getByText('Contact us for product specifications')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Related products' })).toBeVisible();
  await expect(page.locator('body')).not.toContainText(/\$\s?\d/); // no invented prices
  await page.getByRole('link', { name: 'Request a quote' }).first().click();
  await expect(page).toHaveURL(/request-a-quote\?product=baobab-powder/);
  await expect(page.getByRole('combobox', { name: 'Product' }).first()).toHaveValue('Baobab Powder');
});

test('wholesale inquiry link preselects subject and product on the contact form', async ({ page }) => {
  await page.goto('/products/cassava-flour');
  await page.getByRole('link', { name: 'Wholesale inquiry' }).click();
  await expect(page.getByLabel('Inquiry subject')).toHaveValue('Wholesale Inquiry');
  await expect(page.getByText('Product: Cassava Flour')).toBeVisible();
});

test('FAQ accordion opens and closes', async ({ page }) => {
  await page.goto('/faqs');
  const q = page.getByText('Is there a minimum order?');
  const answer = page.getByText('Minimum quantities depend on the product');
  await expect(answer).toBeHidden();
  await q.click();
  await expect(answer).toBeVisible();
  await q.click();
  await expect(answer).toBeHidden();
});
