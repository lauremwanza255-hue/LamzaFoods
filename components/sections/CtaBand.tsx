import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

/** Compact call to action used at the end of inner pages. */
export function CtaBand({
  title = 'Let’s grow together.',
  body = 'We partner with retailers, distributors and businesses that share our commitment to quality and excellence.',
  primary = { label: 'Become a partner', href: '/become-a-partner' },
  secondary = { label: 'Request a quote', href: '/request-a-quote' },
}: {
  title?: string;
  body?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string } | null;
}) {
  return (
    <section aria-label={title} className="on-dark relative isolate overflow-hidden bg-navy text-white">
      <div aria-hidden="true" className="bg-brand-pattern absolute inset-0 -z-10 opacity-[0.06]" />
      <div className="container-site flex flex-col gap-6 py-12 md:flex-row md:items-center md:justify-between lg:py-[calc(30*var(--u))]">
        <div>
          <h2 className="font-display text-[26px] leading-tight lg:text-[calc(22*var(--u))]">{title}</h2>
          <p className="mt-2 max-w-[56ch] text-[16px] leading-[1.6] text-white/90 lg:text-[max(14px,calc(11.5*var(--u)))]">{body}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href={primary.href} className="btn btn-primary">
            {primary.label}
            <ArrowRight aria-hidden="true" className="btn-arrow" />
          </Link>
          {secondary && (
            <Link href={secondary.href} className="btn btn-outline-light">
              {secondary.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
