import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { JsonLd } from './JsonLd';
import { breadcrumbJsonLd } from '@/lib/seo';

export type Crumb = { name: string; path: string };

export function Breadcrumbs({ items, tone = 'dark' }: { items: Crumb[]; tone?: 'dark' | 'light' }) {
  const all = [{ name: 'Home', path: '/' }, ...items];
  const text = tone === 'dark' ? 'text-white/80' : 'text-ink-2';
  return (
    <>
      <nav aria-label="Breadcrumb">
        <ol className={`flex flex-wrap items-center gap-1.5 text-[13px] ${text}`}>
          {all.map((c, i) => {
            const last = i === all.length - 1;
            return (
              <li key={c.path} className="flex items-center gap-1.5">
                {last ? (
                  <span aria-current="page" className={tone === 'dark' ? 'text-white' : 'text-navy'}>
                    {c.name}
                  </span>
                ) : (
                  <>
                    <Link href={c.path} className="underline-offset-2 hover:underline">
                      {c.name}
                    </Link>
                    <ChevronRight aria-hidden="true" className="size-3.5 opacity-70" />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbJsonLd(all)} />
    </>
  );
}
