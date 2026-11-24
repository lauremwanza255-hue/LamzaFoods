import type { Metadata } from 'next';
import { PageBanner } from '@/components/ui/PageBanner';
import { QuoteRequestForm } from '@/components/forms/QuoteRequestForm';
import { ContactAside } from '@/components/sections/ContactAside';
import { productBySlug } from '@/data/products';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Request a Quote',
  description: 'Request a quotation for African food products from Lamza Foods. Add several products, quantities and packaging preferences in one request.',
  path: '/request-a-quote',
});

export default async function RequestAQuotePage({ searchParams }: { searchParams: Promise<{ product?: string }> }) {
  const { product } = await searchParams;
  const selected = product ? productBySlug(product)?.name : undefined;
  return (
    <>
      <PageBanner
        eyebrow="Request a quote"
        title="Request a quote"
        intro="List the products, quantities and packaging you need. Our team will reply with availability and pricing for your business."
        crumbs={[{ name: 'Request a Quote', path: '/request-a-quote' }]}
        image={{ src: '/images/products/cassava-flour.webp', alt: '' }}
      />
      <section aria-label="Quote request form" className="bg-gray-soft/60 py-12 lg:py-[calc(40*var(--u))]">
        <div className="container-site grid gap-10 lg:grid-cols-[1fr_300px]">
          <div className="rounded-md bg-white p-6 shadow-[0_1px_2px_rgba(26,36,83,0.06)] sm:p-8">
            <QuoteRequestForm key={selected ?? 'none'} preselected={selected} />
          </div>
          <div className="space-y-6">
            <ContactAside title="Questions about an order?" />
            <p className="text-[16px] leading-[1.6] text-ink-2">
              Prices depend on product, quantity, packaging and destination, so we quote each request individually.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
