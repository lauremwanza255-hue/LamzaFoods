import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PageBanner } from '@/components/ui/PageBanner';
import { CtaBand } from '@/components/sections/CtaBand';
import { Icon } from '@/components/ui/Icon';
import { markets } from '@/data/markets';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Markets',
  description: 'Lamza Foods supplies African food products to Canadian retailers, wholesalers and distributors, and welcomes export and distribution inquiries.',
  path: '/markets',
});

export default function MarketsPage() {
  return (
    <>
      <PageBanner
        eyebrow="Markets"
        title="Who we serve"
        intro="We supply African food products to businesses in Canada and welcome inquiries from importers and distributors in other markets."
        crumbs={[{ name: 'Markets', path: '/markets' }]}
        image={{ src: '/images/hero/hero-food-flatlay.webp', alt: '', position: 'object-[70%_50%]' }}
      />
      <section aria-label="Market segments" className="bg-white py-14 lg:py-[calc(48*var(--u))]">
        <div className="container-site">
          <ul className="grid gap-6 md:grid-cols-2">
            {markets.map((m) => (
              <li key={m.slug}>
                <article className="group relative flex h-full flex-col overflow-hidden rounded-md border border-line-strong bg-white transition-shadow hover:shadow-[0_8px_24px_rgba(26,36,83,0.1)]">
                  <div className="relative aspect-[16/7] overflow-hidden">
                    <Image src={m.image} alt="" fill sizes="(min-width: 768px) 45vw, 100vw" className="object-cover transition-transform duration-300 group-hover:scale-[1.02]" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-3">
                      <Icon name={m.icon} className="size-7 text-green" />
                      <h2 className="font-display text-[22px] font-bold text-navy">
                        <Link href={`/markets/${m.slug}`} className="after:absolute after:inset-0">
                          {m.name}
                        </Link>
                      </h2>
                    </div>
                    <p className="mt-2 text-[16px] leading-[1.6] text-ink-2">{m.summary}</p>
                    <span aria-hidden="true" className="link-arrow mt-auto pt-5">
                      Learn more <ArrowRight className="size-[1.2em]" />
                    </span>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section aria-labelledby="distribution" className="bg-gray-soft/60 py-14 lg:py-[calc(40*var(--u))]">
        <div className="container-site grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="eyebrow">Distribution partnerships</p>
            <h2 id="distribution" className="title-section mt-2">Represent African food products in your market</h2>
            <p className="mt-3 max-w-[62ch] text-[16px] leading-[1.65] text-ink-2">
              Importers, exporters and distribution companies interested in working with Lamza Foods can send us a partnership
              inquiry. Tell us about your market, your customers and the products you are interested in.
            </p>
          </div>
          <Link href="/become-a-partner" className="btn btn-primary">
            Send a partnership inquiry
            <ArrowRight aria-hidden="true" className="btn-arrow" />
          </Link>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
