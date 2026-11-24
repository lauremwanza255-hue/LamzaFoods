import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { categories, categoryBySlug, products } from '@/data/products';
import { PageBanner } from '@/components/ui/PageBanner';
import { ProductCatalogue } from '@/components/products/ProductCatalogue';
import { CtaBand } from '@/components/sections/CtaBand';
import { pageMetadata } from '@/lib/seo';

export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = categoryBySlug(slug);
  if (!c) return {};
  return pageMetadata({ title: `${c.name} | African Food Products`, description: `${c.description} Supplied by Lamza Foods to retailers and wholesalers.`, path: `/products/category/${c.slug}` });
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = categoryBySlug(slug);
  if (!c) notFound();
  const first = products.find((p) => p.category === c.slug);
  return (
    <>
      <PageBanner
        eyebrow="Product category"
        title={c.name}
        intro={c.description}
        crumbs={[
          { name: 'Products', path: '/products' },
          { name: c.name, path: `/products/category/${c.slug}` },
        ]}
        image={first ? { src: first.primaryImage.src, alt: '' } : undefined}
      />
      <section aria-label={`${c.name} products`} className="bg-white py-12 lg:py-[calc(40*var(--u))]">
        <div className="container-site">
          <ProductCatalogue products={products} categories={categories} activeCategory={c.slug} />
        </div>
      </section>
      <CtaBand
        title="Buying for your business?"
        body="Send us the products and quantities you need and we will reply with availability and next steps."
        primary={{ label: 'Request a quote', href: '/request-a-quote' }}
        secondary={{ label: 'Wholesale inquiry', href: '/contact?subject=Wholesale%20Inquiry' }}
      />
    </>
  );
}
