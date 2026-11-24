import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Product } from '@/types/content';

export function ProductCard({
  product,
  sizes = '(min-width: 1024px) 14vw, (min-width: 640px) 30vw, 46vw',
  headingLevel = 'h3',
  priority,
}: {
  product: Product;
  sizes?: string;
  headingLevel?: 'h2' | 'h3';
  priority?: boolean;
}) {
  const H = headingLevel;
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[4px] border border-line-strong/70 bg-white shadow-[0_1px_2px_rgba(26,36,83,0.06)] transition-shadow duration-200 hover:shadow-[0_6px_18px_rgba(26,36,83,0.10)]">
      <div className="relative aspect-[552/448] overflow-hidden bg-gray-soft">
        <Image
          src={product.primaryImage.src}
          alt={product.primaryImage.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col items-center px-3 pb-4 pt-4 text-center lg:px-[calc(5*var(--u))] lg:pb-[calc(12*var(--u))] lg:pt-[calc(12*var(--u))]">
        <H className="font-display text-[16px] font-bold leading-[1.22] tracking-[-0.015em] text-navy lg:min-h-[2.44em] lg:text-[max(12px,calc(11.6*var(--u)))]">
          <Link href={`/products/${product.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
            {product.name}
          </Link>
        </H>
        <span className="link-arrow mt-auto pt-3 lg:pt-[calc(12*var(--u))]" aria-hidden="true">
          View product
          <ArrowRight className="size-[1.2em]" />
        </span>
      </div>
      {/* keyboard focus ring for the whole card */}
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[4px] ring-green ring-offset-2 group-has-[:focus-visible]:ring-[3px]" />
    </article>
  );
}
