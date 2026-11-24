import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PageBanner } from '@/components/ui/PageBanner';
import { ContactForm } from '@/components/forms/ContactForm';
import { ContactAside } from '@/components/sections/ContactAside';
import { inquirySubjects } from '@/data/site';
import { productBySlug } from '@/data/products';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Contact Us',
  description: 'Contact Lamza Foods about African food products, wholesale supply, distribution, export and partnerships.',
  path: '/contact',
});

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ subject?: string; product?: string }> }) {
  const { subject, product } = await searchParams;
  const defaultSubject = (inquirySubjects as readonly string[]).includes(subject ?? '') ? subject! : product ? 'Product Inquiry' : '';
  const productName = product ? productBySlug(product)?.name ?? '' : '';
  return (
    <>
      <PageBanner
        eyebrow="Contact us"
        title="Get in touch"
        intro="Questions about our products, wholesale supply or a partnership? Send us a message and our team will reply."
        crumbs={[{ name: 'Contact Us', path: '/contact' }]}
      />
      <section aria-labelledby="contact-form-heading" className="bg-gray-soft/60 py-12 lg:py-[calc(40*var(--u))]">
        <div className="container-site grid gap-10 lg:grid-cols-[1fr_320px]">
          <div className="rounded-md bg-white p-6 shadow-[0_1px_2px_rgba(26,36,83,0.06)] sm:p-8">
            <h2 id="contact-form-heading" className="title-section">Send us a message</h2>
            <p className="mb-6 mt-2 text-[16px] text-ink-2">Choose a subject so your message reaches the right person.</p>
            <ContactForm key={`${defaultSubject}-${productName}`} defaultSubject={defaultSubject} product={productName} />
          </div>
          <div className="space-y-6">
            <ContactAside />
            <nav aria-label="Business inquiries" className="rounded-md border border-line-strong bg-white p-6">
              <h2 className="font-display text-[20px] font-bold text-navy">Business inquiries</h2>
              <ul className="mt-3 divide-y divide-line">
                {[
                  { label: 'Request a quote', href: '/request-a-quote' },
                  { label: 'Become a partner', href: '/become-a-partner' },
                  { label: 'Wholesale supply', href: '/markets/wholesale' },
                  { label: 'Export inquiries', href: '/markets/export' },
                ].map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="flex min-h-[44px] items-center justify-between py-2 text-[15px] font-medium text-navy hover:text-green">
                      {l.label}
                      <ArrowRight aria-hidden="true" className="size-4 text-green" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </section>
    </>
  );
}
