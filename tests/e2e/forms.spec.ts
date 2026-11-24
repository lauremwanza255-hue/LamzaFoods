import { expect, test } from '@playwright/test';

async function fillContact(page: import('@playwright/test').Page) {
  await page.getByLabel('Full name').fill('Ada Obi');
  await page.getByLabel('Email address').fill('ada@example.com');
  await page.getByLabel('Inquiry subject').selectOption('General Inquiry');
  await page.getByRole('textbox', { name: 'Message' }).fill('Hello, I would like to know more about your products.');
  await page.getByRole('checkbox', { name: /I agree/ }).check();
  await page.waitForTimeout(2600); // the API rejects implausibly fast submissions
}

test('contact form shows accessible validation errors', async ({ page }) => {
  await page.goto('/contact');
  await page.getByRole('button', { name: 'Send message' }).click();
  const summary = page.getByRole('alert').filter({ hasText: 'before sending' });
  await expect(summary).toBeVisible();
  await expect(summary.locator('xpath=..')).toBeFocused();
  await expect(page.getByLabel('Full name')).toHaveAttribute('aria-invalid', 'true');
  await expect(page.getByText('Enter your full name.').last()).toBeVisible();
  await page.getByLabel('Email address').fill('bad');
  await page.getByRole('button', { name: 'Send message' }).click();
  await expect(page.getByText(/Enter a valid email address/).last()).toBeVisible();
});

test('without a configured backend the form says the message was NOT sent', async ({ page }) => {
  await page.goto('/contact');
  await fillContact(page);
  await page.getByRole('button', { name: 'Send message' }).click();
  await expect(page.getByText('Your inquiry was not sent')).toBeVisible();
  await expect(page.getByText(/not connected yet/)).toBeVisible();
  await expect(page.getByText('Message sent')).toHaveCount(0);
});

test('success is shown only with a server-confirmed reference', async ({ page }) => {
  let body: Record<string, unknown> = {};
  await page.route('**/api/inquiries', async (route) => {
    body = route.request().postDataJSON();
    await new Promise((r) => setTimeout(r, 300));
    await route.fulfill({ status: 201, json: { ok: true, reference: 'LMZ-260101-ABC123' } });
  });
  await page.goto('/contact');
  await fillContact(page);
  const submit = page.getByRole('button', { name: 'Send message' });
  await submit.click();
  await expect(page.getByRole('button', { name: /Sending/ })).toBeDisabled();
  await expect(page.getByText('Message sent')).toBeVisible();
  await expect(page.getByText('LMZ-260101-ABC123')).toBeVisible();
  expect(body.type).toBe('contact');
  expect(body.consent).toBe(true);
  expect(typeof body.startedAt).toBe('number');
});

test('server field errors are shown next to the fields', async ({ page }) => {
  await page.route('**/api/inquiries', (route) =>
    route.fulfill({ status: 422, json: { error: 'validation', message: 'x', fields: { email: 'This email domain cannot receive mail.' } } }),
  );
  await page.goto('/contact');
  await fillContact(page);
  await page.getByRole('button', { name: 'Send message' }).click();
  await expect(page.getByText('This email domain cannot receive mail.').last()).toBeVisible();
});

test('partnership form supports multi-select products and validates', async ({ page }) => {
  let body: Record<string, unknown> = {};
  await page.route('**/api/inquiries', async (route) => {
    body = route.request().postDataJSON();
    await route.fulfill({ status: 201, json: { ok: true, reference: 'LMZ-260101-PART01' } });
  });
  await page.goto('/become-a-partner');
  await page.getByRole('button', { name: 'Submit partnership inquiry' }).click();
  await expect(page.getByText('Choose at least one product of interest.').last()).toBeVisible();
  await page.getByLabel('Full name').fill('Ada Obi');
  await page.getByLabel('Company name').fill('Obi Foods');
  await page.getByLabel('Business email').fill('ada@obi.example');
  await page.getByLabel('Telephone number').fill('+1 780 555 0100');
  await page.getByLabel('Country').fill('Canada');
  await page.getByLabel('City').fill('Calgary');
  await page.getByLabel('Business type').selectOption('Retailer');
  await page.getByRole('checkbox', { name: 'Cassava Flour' }).check();
  await page.getByRole('checkbox', { name: 'African Spices' }).check();
  await page.getByLabel('Estimated order volume').selectOption('Not sure yet');
  await page.getByLabel('Preferred contact method').selectOption('Email');
  await page.getByRole('checkbox', { name: /I agree/ }).check();
  await page.waitForTimeout(2600);
  await page.getByRole('button', { name: 'Submit partnership inquiry' }).click();
  await expect(page.getByText('Partnership inquiry received')).toBeVisible();
  expect(body.productsOfInterest).toEqual(['Cassava Flour', 'African Spices']);
});

test('quote form adds and removes product lines', async ({ page }) => {
  await page.goto('/request-a-quote?product=edible-dried-caterpillars');
  await expect(page.getByRole('combobox', { name: 'Product' }).first()).toHaveValue('Edible Dried Caterpillars');
  await page.getByRole('button', { name: 'Add another product' }).click();
  await expect(page.getByText('Product 2', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Remove product 2' }).click();
  await expect(page.getByText('Product 2', { exact: true })).toHaveCount(0);
  await page.getByRole('button', { name: 'Send quote request' }).click();
  await expect(page.getByText('Enter your quantity.').last()).toBeVisible();
});
