'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { ProductImage } from '@/types/content';

export function ProductGallery({ images, name }: { images: ProductImage[]; name: string }) {
  const [active, setActive] = useState(0);
  const main = images[active];
  return (
    <div>
      <div className="relative aspect-[552/448] overflow-hidden rounded-md border border-line bg-gray-soft">
        <Image src={main.src} alt={main.alt} fill priority sizes="(min-width: 1024px) 46vw, 100vw" className="object-cover" />
      </div>
      {images.length > 1 && (
        <ul className="mt-3 grid grid-cols-4 gap-3" aria-label={`${name} photos`}>
          {images.map((img, i) => (
            <li key={img.src}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={i === active}
                aria-label={`Show photo ${i + 1}: ${img.alt}`}
                className={`relative block aspect-[552/448] w-full overflow-hidden rounded-sm border-2 ${
                  i === active ? 'border-green' : 'border-transparent hover:border-line-strong'
                }`}
              >
                <Image src={img.src} alt="" fill sizes="120px" className="object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
