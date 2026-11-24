import type { Metadata } from 'next';
import Link from 'next/link';
import { PageBanner } from '@/components/ui/PageBanner';
import { EmptyState } from '@/components/ui/EmptyState';
import { NewsCard } from '@/components/sections/NewsCard';
import { CtaBand } from '@/components/sections/CtaBand';
import { newsCategories, visibleArticles } from '@/data/news';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'News & Insights',
  description: 'News, product highlights and insights on African food, agriculture and food quality from Lamza Foods.',
  path: '/news',
});

export default async function NewsPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const { category } = await searchParams;
  const all = visibleArticles();
  const active = newsCategories.find((c) => c === category);
  const list = active ? all.filter((a) => a.category === active) : all;
  const [featured, ...rest] = list;
  return (
    <>
      <PageBanner
        eyebrow="News & insights"
        title="News & insights"
        intro="Company updates, product highlights and stories about African food and agriculture."
        crumbs={[{ name: 'News & Insights', path: '/news' }]}
      />
      <section aria-label="Articles" className="bg-white py-12 lg:py-[calc(40*var(--u))]">
        <div className="container-site">
          <nav aria-label="Article categories">
            <ul className="flex flex-wrap gap-2">
              {[{ label: 'All', href: '/news', on: !active }, ...newsCategories.map((c) => ({ label: c, href: `/news?category=${encodeURIComponent(c)}`, on: active === c }))].map((t) => (
                <li key={t.href}>
                  <Link href={t.href} aria-current={t.on ? 'page' : undefined} className={`inline-flex min-h-[44px] items-center rounded-sm border px-4 text-[14px] font-semibold ${t.on ? 'border-navy bg-navy text-white' : 'border-line-strong text-navy hover:border-green hover:text-green'}`}>
                    {t.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-8">
            {featured ? (
              <>
                <NewsCard article={featured} featured />
                {rest.length > 0 && (
                  <ul className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {rest.map((a) => (
                      <li key={a.slug}>
                        <NewsCard article={a} />
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ) : (
              <EmptyState
                icon="file-text"
                title={active ? `No ${active.toLowerCase()} articles yet` : 'Articles are on their way'}
                body="We have not published any articles here yet. In the meantime, browse our products or contact our team with your questions."
                action={{ label: 'Browse products', href: '/products' }}
              />
            )}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
