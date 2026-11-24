'use client';

import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import { Alert } from '@/components/ui/Alert';
import type { SubmitState } from './useInquiry';

const fieldLabels: Record<string, string> = {
  fullName: 'Full name',
  company: 'Company name',
  email: 'Email address',
  phone: 'Telephone number',
  country: 'Country',
  city: 'City',
  website: 'Business website',
  businessType: 'Business type',
  productsOfInterest: 'Products of interest',
  orderVolume: 'Estimated order volume',
  contactMethod: 'Preferred contact method',
  subject: 'Inquiry subject',
  message: 'Message',
  destination: 'Delivery destination',
  requirements: 'Additional requirements',
  items: 'Products',
  consent: 'Privacy consent',
};

function labelFor(key: string) {
  const m = key.match(/^items\.(\d+)\.(\w+)$/);
  if (m) return `Product ${Number(m[1]) + 1} – ${m[2]}`;
  return fieldLabels[key] ?? key;
}

export function FormShell({
  state,
  errors,
  summaryRef,
  resultRef,
  onSubmit,
  submitLabel,
  successTitle,
  onReset,
  children,
}: {
  state: SubmitState;
  errors: Record<string, string>;
  summaryRef: React.RefObject<HTMLDivElement | null>;
  resultRef: React.RefObject<HTMLDivElement | null>;
  onSubmit: () => void;
  submitLabel: string;
  successTitle: string;
  onReset: () => void;
  children: React.ReactNode;
}) {
  const errorKeys = Object.keys(errors).filter((k) => !['startedAt', 'company_website', 'type'].includes(k));

  if (state.status === 'success') {
    return (
      <div ref={resultRef} tabIndex={-1} className="outline-none">
        <Alert tone="success" title={successTitle}>
          <p>
            Your reference is <strong className="font-semibold">{state.reference}</strong>. Keep it for your records; our
            team will reply using the contact details you gave.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/products" className="btn btn-primary btn-sm">
              Browse products
            </Link>
            <button type="button" className="btn btn-outline-dark btn-sm" onClick={onReset}>
              Send another inquiry
            </button>
          </div>
        </Alert>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="relative space-y-6"
      aria-busy={state.status === 'submitting'}
    >
      {errorKeys.length > 0 && (
        <div ref={summaryRef} tabIndex={-1} className="outline-none">
          <Alert tone="error" title={`Check ${errorKeys.length === 1 ? '1 field' : `${errorKeys.length} fields`} before sending`}>
            <ul className="list-disc pl-5">
              {errorKeys.map((k) => (
                <li key={k}>
                  {labelFor(k)}: {errors[k]}
                </li>
              ))}
            </ul>
          </Alert>
        </div>
      )}
      {children}
      {state.status === 'error' && (
        <div ref={resultRef} tabIndex={-1} className="outline-none">
          <Alert tone="error" title="Your inquiry was not sent">
            {state.message}
          </Alert>
        </div>
      )}
      <div className="flex flex-wrap items-center gap-4 pt-2">
        <button type="submit" className="btn btn-primary min-w-[220px]" disabled={state.status === 'submitting'}>
          {state.status === 'submitting' ? (
            <>
              <Loader2 aria-hidden="true" className="size-4 animate-spin" />
              Sending…
            </>
          ) : (
            submitLabel
          )}
        </button>
        <p className="text-[13px] text-ink-2">
          Fields marked <span className="text-[#b42318]">*</span> are required.
        </p>
      </div>
      <p aria-live="polite" className="sr-only">
        {state.status === 'submitting' ? 'Sending your inquiry' : ''}
      </p>
    </form>
  );
}
