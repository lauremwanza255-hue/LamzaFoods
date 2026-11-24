'use client';

import { Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { businessTypes } from '@/data/site';
import { productOptions, quoteSchema } from '@/lib/inquiry/schema';
import { ConsentCheckbox, Honeypot, SelectField, TextField, TextareaField } from './fields';
import { FormShell } from './FormShell';
import { useInquiry } from './useInquiry';

type Item = { key: number; product: string; quantity: string; packaging: string };

let nextKey = 1;
const newItem = (product = ''): Item => ({ key: nextKey++, product, quantity: '', packaging: '' });

export function QuoteRequestForm({ preselected }: { preselected?: string }) {
  const start = () => ({
    fullName: '',
    company: '',
    email: '',
    phone: '',
    country: '',
    businessType: '',
    destination: '',
    requirements: '',
    consent: false,
    company_website: '',
  });
  const [v, setV] = useState(start);
  const [items, setItems] = useState<Item[]>(() => [newItem(preselected ?? '')]);
  const f = useInquiry(quoteSchema);
  const set = <K extends keyof typeof v>(k: K) => (val: (typeof v)[K]) => {
    setV((s) => ({ ...s, [k]: val }));
    f.clearError(k as string);
  };
  const setItem = (key: number, field: 'product' | 'quantity' | 'packaging', val: string, index: number) => {
    setItems((list) => list.map((it) => (it.key === key ? { ...it, [field]: val } : it)));
    f.clearError(`items.${index}.${field}`);
    f.clearError('items');
  };

  return (
    <FormShell
      {...f}
      onSubmit={() =>
        f.submit({
          type: 'quote',
          ...v,
          items: items.map(({ product, quantity, packaging }) => ({ product, quantity, packaging })),
        })
      }
      submitLabel="Send quote request"
      successTitle="Quote request received"
      onReset={() => {
        setV(start());
        setItems([newItem(preselected ?? '')]);
        f.setState({ status: 'idle' });
      }}
    >
      <Honeypot value={v.company_website} onChange={set('company_website')} />
      <fieldset className="space-y-4">
        <legend className="font-display text-[19px] font-bold text-navy">Products</legend>
        {f.errors.items && <p className="field-error">{f.errors.items}</p>}
        <ol className="space-y-4">
          {items.map((it, i) => (
            <li key={it.key} className="rounded-md border border-line-strong p-4">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-[14px] font-semibold text-navy">Product {i + 1}</p>
                {items.length > 1 && (
                  <button
                    type="button"
                    onClick={() => setItems((l) => l.filter((x) => x.key !== it.key))}
                    className="inline-flex min-h-[44px] items-center gap-1.5 px-2 text-[14px] font-medium text-[#b42318] hover:underline"
                  >
                    <Trash2 aria-hidden="true" className="size-4" />
                    Remove<span className="sr-only"> product {i + 1}</span>
                  </button>
                )}
              </div>
              <div className="grid gap-4 md:grid-cols-[1.4fr_1fr_1fr]">
                <SelectField name={`items.${i}.product`} label="Product" required options={productOptions} value={it.product} onChange={(val) => setItem(it.key, 'product', val, i)} error={f.errors[`items.${i}.product`]} />
                <TextField name={`items.${i}.quantity`} label="Quantity" required hint="e.g. 200 kg or 50 cartons" value={it.quantity} onChange={(val) => setItem(it.key, 'quantity', val, i)} error={f.errors[`items.${i}.quantity`]} />
                <TextField name={`items.${i}.packaging`} label="Packaging preference" hint="e.g. 500 g retail packs" value={it.packaging} onChange={(val) => setItem(it.key, 'packaging', val, i)} error={f.errors[`items.${i}.packaging`]} />
              </div>
            </li>
          ))}
        </ol>
        {items.length < 20 && (
          <button type="button" onClick={() => setItems((l) => [...l, newItem()])} className="btn btn-outline-dark btn-sm">
            <Plus aria-hidden="true" className="size-4" />
            Add another product
          </button>
        )}
      </fieldset>

      <fieldset className="space-y-5">
        <legend className="font-display text-[19px] font-bold text-navy">Your details</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField name="fullName" label="Full name" required autoComplete="name" value={v.fullName} onChange={set('fullName')} error={f.errors.fullName} />
          <TextField name="company" label="Company name" required autoComplete="organization" value={v.company} onChange={set('company')} error={f.errors.company} />
          <TextField name="email" label="Email address" type="email" required autoComplete="email" value={v.email} onChange={set('email')} error={f.errors.email} />
          <TextField name="phone" label="Telephone number" type="tel" required autoComplete="tel" inputMode="tel" value={v.phone} onChange={set('phone')} error={f.errors.phone} />
          <TextField name="country" label="Country" required autoComplete="country-name" value={v.country} onChange={set('country')} error={f.errors.country} />
          <SelectField name="businessType" label="Business type" required options={businessTypes} value={v.businessType} onChange={set('businessType')} error={f.errors.businessType} />
        </div>
        <TextField name="destination" label="Delivery destination" required hint="City and country where the goods should be delivered." value={v.destination} onChange={set('destination')} error={f.errors.destination} />
        <TextareaField name="requirements" label="Additional requirements" value={v.requirements} onChange={set('requirements')} error={f.errors.requirements} />
      </fieldset>
      <ConsentCheckbox checked={v.consent} onChange={set('consent')} error={f.errors.consent} />
    </FormShell>
  );
}
