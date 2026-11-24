import { z } from 'zod';
import { businessTypes, contactMethods, inquirySubjects, orderVolumes } from '@/data/site';
import { products } from '@/data/products';

// No runtime code generation: keeps the strict Content-Security-Policy (no 'unsafe-eval') clean.
z.config({ jitless: true });

// Strip control characters (keep tab/newline) and trim.
const clean = (max: number) =>
  z
    .string()
    .transform((v) => v.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').trim())
    .pipe(z.string().max(max, `Please keep this under ${max} characters.`));

const required = (label: string, max = 120) =>
  clean(max).pipe(z.string().min(1, `Enter your ${label}.`));

const optional = (max = 120) => clean(max).optional().or(z.literal('').transform(() => undefined));

const email = clean(160).pipe(z.string().min(1, 'Enter your email address.').email('Enter a valid email address, like name@company.com.'));

const phoneRequired = clean(40).pipe(
  z
    .string()
    .min(1, 'Enter your telephone number.')
    .regex(/^[+()\d\s.-]{7,40}$/, 'Enter a valid telephone number, digits and + ( ) - only.'),
);

const phoneOptional = clean(40)
  .pipe(z.string().regex(/^$|^[+()\d\s.-]{7,40}$/, 'Enter a valid telephone number, digits and + ( ) - only.'))
  .optional();

const consent = z.literal(true, { error: 'Please agree to the privacy notice so we can reply to you.' });

export const productOptions = [...products.map((p) => p.name), 'Other / not listed'] as const;

const base = {
  /** Honeypot: must stay empty. Hidden from people, often filled by bots. */
  company_website: z.string().max(0).optional().or(z.literal('')),
  /** Epoch ms when the form was rendered (time trap). */
  startedAt: z.number().int().positive(),
  consent,
};

export const contactSchema = z.object({
  type: z.literal('contact'),
  fullName: required('full name'),
  email,
  phone: phoneOptional,
  company: optional(),
  subject: z.enum(inquirySubjects, { error: 'Choose an inquiry subject.' }),
  message: clean(5000).pipe(z.string().min(10, 'Enter a message of at least 10 characters.')),
  product: optional(160),
  ...base,
});

export const partnershipSchema = z.object({
  type: z.literal('partnership'),
  fullName: required('full name'),
  company: required('company name'),
  email,
  phone: phoneRequired,
  country: required('country', 80),
  city: required('city', 80),
  website: clean(200)
    .pipe(z.string().regex(/^$|^(https?:\/\/)?[\w-]+(\.[\w-]+)+([/?#].*)?$/i, 'Enter a valid website address.'))
    .optional(),
  businessType: z.enum(businessTypes, { error: 'Choose your business type.' }),
  productsOfInterest: z
    .array(z.enum(productOptions))
    .min(1, 'Choose at least one product of interest.')
    .max(productOptions.length),
  orderVolume: z.enum(orderVolumes, { error: 'Choose an estimated order volume.' }),
  contactMethod: z.enum(contactMethods, { error: 'Choose a preferred contact method.' }),
  message: optional(5000),
  ...base,
});

export const quoteItemSchema = z.object({
  product: z.enum(productOptions, { error: 'Choose a product.' }),
  quantity: required('quantity', 80),
  packaging: optional(120),
});

export const quoteSchema = z.object({
  type: z.literal('quote'),
  fullName: required('full name'),
  company: required('company name'),
  email,
  phone: phoneRequired,
  country: required('country', 80),
  businessType: z.enum(businessTypes, { error: 'Choose your business type.' }),
  items: z.array(quoteItemSchema).min(1, 'Add at least one product.').max(20, 'Add up to 20 products per request.'),
  destination: required('delivery destination', 160),
  requirements: optional(5000),
  ...base,
});

export const inquirySchema = z.discriminatedUnion('type', [contactSchema, partnershipSchema, quoteSchema]);

export type ContactInput = z.infer<typeof contactSchema>;
export type PartnershipInput = z.infer<typeof partnershipSchema>;
export type QuoteInput = z.infer<typeof quoteSchema>;
export type InquiryInput = z.infer<typeof inquirySchema>;

/** Flattens zod issues to { fieldPath: message } for the form. */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path.join('.');
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
