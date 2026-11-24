'use client';

import Link from 'next/link';
import { Search, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { Product, ProductCategory } from '@/types/content';
import { ProductCard } from './ProductCard';

export function ProductCatalogue({
  products,
  categories,
  activeCategory,
}: {
  products: Product[];
  categories: ProductCategory[];
  activeCategory?: string;
}) {
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();

  const results = useMemo(() => {
    return products.filter((p) => {
      if (activeCategory && p.category !== activeCategory) return false;
      if (!q) return true;
      const cat = categories.find((c) => c.slug === p.category)?.name ?? '';
      return `${p.name} ${p.shortDescription} ${cat}`.toLowerCase().includes(q);
    });
  }, [products, categories, activeCategory, q]);

  const filtered = Boolean(q || activeCategory);
  const tabs = [{ slug: '', name: 'All Products', href: '/products' }, ...categories.map((c) => ({ ...c, href: `/products/category/${c.slug}` }))];

  return (
    <div>
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <nav aria-label="Product categories">
          <ul className="flex flex-wrap gap-2">
            {tabs.map((t) => {
              const active = (activeCategory ?? '') === t.slug;
              return (
                <li key={t.href}>
                  <Link
                    href={t.href}
                    aria-current={active ? 'page' : undefined}
                    scroll={false}
                    className={`inline-flex min-h-[44px] items-center rounded-sm border px-4 text-[14px] font-semibold transition-colors ${
                      active
                        ? 'border-navy bg-navy text-white'
                        : 'border-line-strong bg-white text-navy hover:border-green hover:text-green'
                    }`}
                  >
                    {t.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="w-full lg:w-[320px]">
          <label htmlFor="product-search" className="field-label">
            Search products
          </label>
          <div className="relative">
            <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-ink-2" />
            <input
              id="product-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. cassava, fish, spices"
              className="field-control pl-10"
              aria-controls="product-results"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
        <p role="status" aria-live="polite" className="text-[16px] text-ink-2">
          Showing <strong className="text-navy">{results.length}</strong> {results.length === 1 ? 'product' : 'products'}
          {q && (
            <>
              {' '}
              for “<span className="text-navy">{query.trim()}</span>”
            </>
          )}
        </p>
        {filtered && (
          <Link
            href="/products"
            onClick={() => setQuery('')}
            scroll={false}
            className="inline-flex min-h-[44px] items-center gap-1.5 text-[14px] font-semibold text-green hover:underline"
          >
            <X aria-hidden="true" className="size-4" />
            Clear filters
          </Link>
        )}
      </div>

      <div id="product-results" className="mt-8">
        {results.length ? (
          <ul className="grid grid-cols-1 gap-3 min-[360px]:grid-cols-2 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
            {results.map((p) => (
              <li key={p.slug}>
                <ProductCard product={p} headingLevel="h2" sizes="(min-width: 1024px) 22vw, (min-width: 768px) 30vw, 46vw" />
              </li>
            ))}
          </ul>
        ) : (
          <div className="rounded-md border border-line-strong bg-gray-soft/50 px-6 py-12 text-center">
            <h2 className="font-display text-[20px] font-bold text-navy">No products match your search</h2>
            <p className="mx-auto mt-2 max-w-[48ch] text-[16px] text-ink-2">
              Try a different word, or clear the filters to see the full catalogue. Looking for something we don’t list?
              Ask our team.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href="/products" onClick={() => setQuery('')} className="btn btn-primary btn-sm">
                Clear filters
              </Link>
              <Link href="/contact" className="btn btn-outline-dark btn-sm">
                Ask about a product
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
