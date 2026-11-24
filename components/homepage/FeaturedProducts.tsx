import Link from 'next/link';
import { featuredProducts } from '@/data/products';
import { ProductCard } from '@/components/products/ProductCard';

export function FeaturedProducts() {
  const items = featuredProducts().slice(0, 6);
  return (
    <section aria-labelledby="products-title" className="bg-white py-14 lg:pb-[calc(14*var(--u))] lg:pt-[calc(25*var(--u))]">
      <div className="container-site">
        <div className="text-center">
          <p className="eyebrow">Our products</p>
          <h2 id="products-title" className="title-section mt-2 lg:mt-[calc(5*var(--u))]">
            Authentic. Natural. Nutritious.
          </h2>
        </div>
        <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:mx-[calc(3*var(--u))] lg:mt-[calc(20*var(--u))] lg:grid-cols-6 lg:gap-[calc(14.5*var(--u))]">
          {items.map((p) => (
            <li key={p.slug}>
              <ProductCard product={p} />
            </li>
          ))}
        </ul>
        <div className="mt-8 text-center lg:mt-[calc(14*var(--u))]">
          <Link href="/products" className="btn btn-primary btn-sm lg:min-w-[calc(160*var(--u))]">
            View all products
          </Link>
        </div>
      </div>
    </section>
  );
}
