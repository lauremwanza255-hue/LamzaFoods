import type { Metadata } from 'next';
import { categories, products } from '@/data/products';
import { PageBanner } from '@/components/ui/PageBanner';
import { ProductCatalogue } from '@/components/products/ProductCatalogue';
import { CtaBand } from '@/components/sections/CtaBand';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'African Food Products',
  description:
    'Browse the Lamza Foods catalogue of African food products: dried fish, cassava flour, baobab powder, African spices and specialty foods for retail and wholesale.',
  path: '/products',
});

export default function ProductsPage() {
  return (
    <>
      <PageBanner
        eyebrow="Our products"
        title="Authentic African food products"
        intro="Dried fish, flours, powders, spices and specialty foods for retailers, wholesalers and distributors. Ask us for specifications, pack sizes and wholesale quantities."
        crumbs={[{ name: 'Products', path: '/products' }]}
        image={{ src: '/images/products/african-spices.webp', alt: '' }}
      />
      <section aria-label="Product catalogue" className="bg-white py-12 lg:py-[calc(40*var(--u))]">
        <div className="container-site">
          <ProductCatalogue products={products} categories={categories} />
        </div>
      </section>
      <CtaBand
        title="Need a product you don’t see?"
        body="Our catalogue is growing. Tell us what your customers are asking for and we will let you know what we can source."
        primary={{ label: 'Request a quote', href: '/request-a-quote' }}
        secondary={{ label: 'Contact us', href: '/contact' }}
      />
    </>
  );
}
