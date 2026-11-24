'use client';

import { useState } from 'react';
import { inquirySubjects } from '@/data/site';
import { contactSchema } from '@/lib/inquiry/schema';
import { ConsentCheckbox, Honeypot, SelectField, TextField, TextareaField } from './fields';
import { FormShell } from './FormShell';
import { useInquiry } from './useInquiry';

const initial = { fullName: '', email: '', phone: '', company: '', subject: '', message: '', consent: false, company_website: '' };

export function ContactForm({ defaultSubject = '', product = '' }: { defaultSubject?: string; product?: string }) {
  const [v, setV] = useState({ ...initial, subject: defaultSubject });
  const f = useInquiry(contactSchema);
  const set = <K extends keyof typeof v>(k: K) => (val: (typeof v)[K]) => {
    setV((s) => ({ ...s, [k]: val }));
    f.clearError(k as string);
  };

  return (
    <FormShell
      {...f}
      onSubmit={() => f.submit({ type: 'contact', ...v, product: product || undefined })}
      submitLabel="Send message"
      successTitle="Message sent"
      onReset={() => {
        setV({ ...initial, subject: defaultSubject });
        f.setState({ status: 'idle' });
      }}
    >
      <Honeypot value={v.company_website} onChange={set('company_website')} />
      {product && (
        <p className="rounded-sm bg-gray-soft px-4 py-3 text-[15px] text-navy">
          Product: <strong>{product}</strong>
        </p>
      )}
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField name="fullName" label="Full name" required autoComplete="name" value={v.fullName} onChange={set('fullName')} error={f.errors.fullName} />
        <TextField name="email" label="Email address" type="email" required autoComplete="email" value={v.email} onChange={set('email')} error={f.errors.email} />
        <TextField name="phone" label="Phone number" type="tel" autoComplete="tel" inputMode="tel" value={v.phone} onChange={set('phone')} error={f.errors.phone} />
        <TextField name="company" label="Company name" autoComplete="organization" value={v.company} onChange={set('company')} error={f.errors.company} />
      </div>
      <SelectField name="subject" label="Inquiry subject" required options={inquirySubjects} value={v.subject} onChange={set('subject')} error={f.errors.subject} />
      <TextareaField name="message" label="Message" required rows={6} value={v.message} onChange={set('message')} error={f.errors.message} />
      <ConsentCheckbox checked={v.consent} onChange={set('consent')} error={f.errors.consent} />
    </FormShell>
  );
}
