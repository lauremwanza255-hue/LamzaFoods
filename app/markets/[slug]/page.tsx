import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Check } from 'lucide-react';
import { PageBanner } from '@/components/ui/PageBanner';
import { CtaBand } from '@/components/sections/CtaBand';
import { ProductCard } from '@/components/products/ProductCard';
import { marketBySlug, markets } from '@/data/markets';
import { featuredProducts } from '@/data/products';
import { pageMetadata } from '@/lib/seo';

export const dynamicParams = false;

export function generateStaticParams() {
  return markets.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const m = marketBySlug(slug);
  if (!m) return {};
  return pageMetadata({ title: `${m.name} | Markets`, description: m.summary, path: `/markets/${m.slug}` });
}

export default async function MarketPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const m = marketBySlug(slug);
  if (!m) notFound();
  return (
    <>
      <PageBanner
        eyebrow="Markets"
        title={m.name}
        intro={m.summary}
        crumbs={[
          { name: 'Markets', path: '/markets' },
          { name: m.name, path: `/markets/${m.slug}` },
        ]}
        image={{ src: m.image, alt: '' }}
      >
        <Link href={m.cta.href} className="btn btn-primary mt-7">
          {m.cta.label}
          <ArrowRight aria-hidden="true" className="btn-arrow" />
        </Link>
      </PageBanner>
      <section aria-labelledby="overview" className="bg-white py-14 lg:py-[calc(48*var(--u))]">
        <div className="container-site grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <h2 id="overview" className="title-section lg:text-[calc(25*var(--u))]">Overview</h2>
            <p className="mt-4 text-[16.5px] leading-[1.7] text-ink-2">{m.intro}</p>
            <h3 className="mt-10 font-display text-[20px] font-bold text-navy">How we can help</h3>
            <ul className="mt-5 space-y-5">
              {m.howWeHelp.map((h) => (
                <li key={h.title} className="border-l-2 border-green pl-4">
                  <p className="font-semibold text-navy">{h.title}</p>
                  <p className="mt-1 text-[16px] leading-[1.6] text-ink-2">{h.body}</p>
                </li>
              ))}
            </ul>
          </div>
          <aside aria-labelledby="who" className="h-fit rounded-md bg-gray-soft/70 p-7">
            <h2 id="who" className="font-display text-[20px] font-bold text-navy">Who this is for</h2>
            <ul className="mt-4 space-y-3">
              {m.forWho.map((w) => (
                <li key={w} className="flex gap-3 text-[15.5px] text-navy">
                  <Check aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-green" />
                  {w}
                </li>
              ))}
            </ul>
            <Link href={m.cta.href} className="btn btn-primary mt-6 w-full">
              {m.cta.label}
            </Link>
          </aside>
        </div>
      </section>
      <section aria-labelledby="products-heading" className="bg-gray-soft/60 py-12 lg:py-[calc(36*var(--u))]">
        <div className="container-site">
          <h2 id="products-heading" className="title-section">Products</h2>
          <ul className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {featuredProducts().map((p) => (
              <li key={p.slug}>
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
