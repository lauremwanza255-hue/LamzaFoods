import { describe, expect, it } from 'vitest';
import { contactSchema, fieldErrors, inquirySchema, partnershipSchema, quoteSchema } from '@/lib/inquiry/schema';

const startedAt = Date.now() - 10_000;

const contact = { type: 'contact', fullName: 'Ada Obi', email: 'ada@example.com', subject: 'Product Inquiry', message: 'Please send cassava flour specs.', consent: true, startedAt };
const partnership = {
  type: 'partnership', fullName: 'Ada Obi', company: 'Obi Foods', email: 'ada@obi.example', phone: '+1 780 555 0100', country: 'Canada', city: 'Calgary',
  website: 'www.obifoods.example', businessType: 'Retailer', productsOfInterest: ['Cassava Flour'], orderVolume: 'Not sure yet', contactMethod: 'Email', consent: true, startedAt,
};
const quote = {
  type: 'quote', fullName: 'Ada Obi', company: 'Obi Foods', email: 'ada@obi.example', phone: '+1 780 555 0100', country: 'Canada', businessType: 'Wholesaler',
  items: [{ product: 'Baobab Powder', quantity: '200 kg', packaging: '' }], destination: 'Calgary, Canada', consent: true, startedAt,
};

describe('inquiry schemas', () => {
  it('accepts valid contact, partnership and quote inquiries', () => {
    expect(inquirySchema.safeParse(contact).success).toBe(true);
    expect(inquirySchema.safeParse(partnership).success).toBe(true);
    expect(inquirySchema.safeParse(quote).success).toBe(true);
  });

  it('requires consent', () => {
    const r = contactSchema.safeParse({ ...contact, consent: false });
    expect(r.success).toBe(false);
    if (!r.success) expect(fieldErrors(r.error).consent).toMatch(/privacy/i);
  });

  it('rejects an invalid email with a helpful message', () => {
    const r = contactSchema.safeParse({ ...contact, email: 'not-an-email' });
    expect(r.success).toBe(false);
    if (!r.success) expect(fieldErrors(r.error).email).toMatch(/valid email/i);
  });

  it('trims input and strips control characters', () => {
    const r = contactSchema.safeParse({ ...contact, fullName: '  Ada\u0007 Obi  ' });
    expect(r.success && r.data.fullName).toBe('Ada Obi');
  });

  it('requires at least one product of interest for partnerships', () => {
    const r = partnershipSchema.safeParse({ ...partnership, productsOfInterest: [] });
    expect(r.success).toBe(false);
    if (!r.success) expect(fieldErrors(r.error).productsOfInterest).toBeDefined();
  });

  it('rejects unknown products and enforces quote item fields', () => {
    expect(partnershipSchema.safeParse({ ...partnership, productsOfInterest: ['Gold bars'] }).success).toBe(false);
    const r = quoteSchema.safeParse({ ...quote, items: [{ product: 'Baobab Powder', quantity: '' }] });
    expect(r.success).toBe(false);
    if (!r.success) expect(fieldErrors(r.error)['items.0.quantity']).toBeDefined();
  });

  it('rejects a filled honeypot and overlong messages', () => {
    expect(contactSchema.safeParse({ ...contact, company_website: 'spam.example' }).success).toBe(false);
    expect(contactSchema.safeParse({ ...contact, message: 'x'.repeat(5001) }).success).toBe(false);
  });

  it('validates phone numbers', () => {
    expect(partnershipSchema.safeParse({ ...partnership, phone: 'call me' }).success).toBe(false);
    expect(contactSchema.safeParse({ ...contact, phone: '' }).success).toBe(true);
  });
});
