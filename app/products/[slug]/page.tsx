import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Info } from 'lucide-react';
import { categoryBySlug, productBySlug, products, relatedProducts } from '@/data/products';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ProductGallery } from '@/components/products/ProductGallery';
import { ProductCard } from '@/components/products/ProductCard';
import { CtaBand } from '@/components/sections/CtaBand';
import { DraftNotice } from '@/components/sections/DraftNotice';
import { showClaim } from '@/lib/config';
import { pageMetadata } from '@/lib/seo';

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = productBySlug(slug);
  if (!p) return {};
  return pageMetadata({ title: p.seoTitle.replace(' | Lamza Foods', ''), description: p.seoDescription, path: `/products/${p.slug}`, image: p.primaryImage.src });
}

const availabilityLabel = { available: 'Available', 'on-request': 'Available on request', 'coming-soon': 'Coming soon' };

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = productBySlug(slug);
  if (!p) notFound();
  const cat = categoryBySlug(p.category)!;

  const details: { label: string; value: React.ReactNode }[] = [];
  if (showClaim(p.countryOfOrigin)) details.push({ label: 'Origin', value: p.countryOfOrigin!.value });
  if (showClaim(p.ingredients)) details.push({ label: 'Ingredients', value: p.ingredients!.value });
  if (showClaim(p.packagingOptions)) details.push({ label: 'Packaging options', value: p.packagingOptions!.value.join(', ') });
  if (showClaim(p.storage)) details.push({ label: 'Storage', value: p.storage!.value });
  if (showClaim(p.shelfLife)) details.push({ label: 'Shelf life', value: p.shelfLife!.value });
  if (showClaim(p.allergens)) details.push({ label: 'Allergen information', value: p.allergens!.value });
  if (showClaim(p.specifications)) p.specifications!.value.forEach((s) => details.push({ label: s.label, value: s.value }));

  const quoteHref = `/request-a-quote?product=${p.slug}`;
  const wholesaleHref = `/contact?subject=${encodeURIComponent('Wholesale Inquiry')}&product=${p.slug}`;

  return (
    <>
      <section aria-labelledby="product-title" className="bg-white py-8 lg:py-[calc(28*var(--u))]">
        <div className="container-site">
          <Breadcrumbs
            tone="light"
            items={[
              { name: 'Products', path: '/products' },
              { name: cat.name, path: `/products/category/${cat.slug}` },
              { name: p.name, path: `/products/${p.slug}` },
            ]}
          />
          <div className="mt-6 grid gap-10 lg:mt-[calc(20*var(--u))] lg:grid-cols-2 lg:gap-[calc(44*var(--u))]">
            <ProductGallery images={[p.primaryImage, ...p.gallery]} name={p.name} />
            <div>
              {p.copyStatus === 'draft' && <DraftNotice>product description is draft catalogue copy.</DraftNotice>}
              <p className="eyebrow">
                <Link href={`/products/category/${cat.slug}`} className="hover:underline">
                  {cat.name}
                </Link>
              </p>
              <h1 id="product-title" className="mt-2 font-display text-[clamp(1.9rem,5vw,2.4rem)] font-bold leading-[1.15] text-navy lg:text-[calc(30*var(--u))]">
                {p.name}
              </h1>
              <span aria-hidden="true" className="rule-green mt-4" />
              <div className="mt-5 space-y-4 text-[16px] leading-[1.65] text-ink-2 lg:text-[max(15px,calc(12.6*var(--u)))]">
                {p.fullDescription.map((para) => (
                  <p key={para}>{para}</p>
                ))}
              </div>

              <dl className="mt-6 divide-y divide-line border-y border-line text-[15px]">
                <div className="grid grid-cols-[minmax(130px,40%)_1fr] gap-4 py-3">
                  <dt className="font-semibold text-navy">Category</dt>
                  <dd className="text-ink-2">{cat.name}</dd>
                </div>
                <div className="grid grid-cols-[minmax(130px,40%)_1fr] gap-4 py-3">
                  <dt className="font-semibold text-navy">Wholesale</dt>
                  <dd className="text-ink-2">{p.wholesale ? availabilityLabel[p.availability] : 'Retail only'}</dd>
                </div>
                {details.map((d) => (
                  <div key={d.label} className="grid grid-cols-[minmax(130px,40%)_1fr] gap-4 py-3">
                    <dt className="font-semibold text-navy">{d.label}</dt>
                    <dd className="text-ink-2">{d.value}</dd>
                  </div>
                ))}
              </dl>

              {details.length === 0 && (
                <p className="mt-5 flex gap-3 rounded-sm bg-gray-soft px-4 py-3 text-[16px] text-navy">
                  <Info aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-green" />
                  <span>
                    Contact us for product specifications, including origin, packaging, storage, shelf life and allergen
                    information.
                  </span>
                </p>
              )}

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link href={quoteHref} className="btn btn-primary">
                  Request a quote
                  <ArrowRight aria-hidden="true" className="btn-arrow" />
                </Link>
                <Link href={wholesaleHref} className="btn btn-outline-dark">
                  Wholesale inquiry
                </Link>
                <Link href={`/contact?product=${p.slug}`} className="btn btn-outline-dark">
                  Contact us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="related-title" className="bg-gray-soft/60 py-12 lg:py-[calc(36*var(--u))]">
        <div className="container-site">
          <h2 id="related-title" className="title-section">
            Related products
          </h2>
          <ul className="mt-6 grid grid-cols-1 gap-3 min-[360px]:grid-cols-2 sm:gap-5 md:grid-cols-3">
            {relatedProducts(p).map((r) => (
              <li key={r.slug}>
                <ProductCard product={r} sizes="(min-width: 768px) 30vw, 46vw" />
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
