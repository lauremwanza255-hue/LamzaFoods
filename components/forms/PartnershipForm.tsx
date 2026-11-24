'use client';

import { useState } from 'react';
import { businessTypes, contactMethods, orderVolumes } from '@/data/site';
import { partnershipSchema, productOptions } from '@/lib/inquiry/schema';
import { CheckboxGroup, ConsentCheckbox, Honeypot, SelectField, TextField, TextareaField } from './fields';
import { FormShell } from './FormShell';
import { useInquiry } from './useInquiry';

const initial = {
  fullName: '',
  company: '',
  email: '',
  phone: '',
  country: '',
  city: '',
  website: '',
  businessType: '',
  productsOfInterest: [] as string[],
  orderVolume: '',
  contactMethod: '',
  message: '',
  consent: false,
  company_website: '',
};

export function PartnershipForm() {
  const [v, setV] = useState(initial);
  const f = useInquiry(partnershipSchema);
  const set = <K extends keyof typeof v>(k: K) => (val: (typeof v)[K]) => {
    setV((s) => ({ ...s, [k]: val }));
    f.clearError(k as string);
  };

  return (
    <FormShell
      {...f}
      onFieldBlur={(name) => f.validateField(name, { type: 'partnership', ...v })}
      onSubmit={() => f.submit({ type: 'partnership', ...v })}
      submitLabel="Submit partnership inquiry"
      successTitle="Partnership inquiry received"
      onReset={() => {
        setV(initial);
        f.setState({ status: 'idle' });
      }}
    >
      <Honeypot value={v.company_website} onChange={set('company_website')} />
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField name="fullName" label="Full name" required autoComplete="name" value={v.fullName} onChange={set('fullName')} error={f.errors.fullName} />
        <TextField name="company" label="Company name" required autoComplete="organization" value={v.company} onChange={set('company')} error={f.errors.company} />
        <TextField name="email" label="Business email" type="email" required autoComplete="email" value={v.email} onChange={set('email')} error={f.errors.email} />
        <TextField name="phone" label="Telephone number" type="tel" required autoComplete="tel" inputMode="tel" value={v.phone} onChange={set('phone')} error={f.errors.phone} />
        <TextField name="country" label="Country" required autoComplete="country-name" value={v.country} onChange={set('country')} error={f.errors.country} />
        <TextField name="city" label="City" required autoComplete="address-level2" value={v.city} onChange={set('city')} error={f.errors.city} />
        <TextField name="website" label="Business website" type="url" autoComplete="url" inputMode="url" value={v.website} onChange={set('website')} error={f.errors.website} hint="For example www.yourcompany.com" />
        <SelectField name="businessType" label="Business type" required options={businessTypes} value={v.businessType} onChange={set('businessType')} error={f.errors.businessType} />
      </div>
      <CheckboxGroup
        name="productsOfInterest"
        label="Products of interest"
        required
        hint="Choose all that apply."
        options={productOptions}
        value={v.productsOfInterest}
        onChange={set('productsOfInterest')}
        error={f.errors.productsOfInterest}
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <SelectField name="orderVolume" label="Estimated order volume" required options={orderVolumes} value={v.orderVolume} onChange={set('orderVolume')} error={f.errors.orderVolume} />
        <SelectField name="contactMethod" label="Preferred contact method" required options={contactMethods} value={v.contactMethod} onChange={set('contactMethod')} error={f.errors.contactMethod} />
      </div>
      <TextareaField name="message" label="Additional message" value={v.message} onChange={set('message')} error={f.errors.message} />
      <ConsentCheckbox checked={v.consent} onChange={set('consent')} error={f.errors.consent} />
    </FormShell>
  );
}
