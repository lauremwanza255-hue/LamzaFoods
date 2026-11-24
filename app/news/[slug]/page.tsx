import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { JsonLd } from '@/components/ui/JsonLd';
import { NewsCard, formatDate } from '@/components/sections/NewsCard';
import { ShareLinks } from '@/components/sections/ShareLinks';
import { CtaBand } from '@/components/sections/CtaBand';
import { articleBySlug, visibleArticles } from '@/data/news';
import { site } from '@/data/site';
import { pageMetadata } from '@/lib/seo';

export function generateStaticParams() {
  return visibleArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = articleBySlug(slug);
  if (!a) return {};
  const meta = pageMetadata({ title: a.seoTitle ?? a.title, description: a.seoDescription ?? a.excerpt, path: `/news/${a.slug}`, image: a.featuredImage.src, type: 'article' });
  return a.status === 'draft' ? { ...meta, robots: { index: false, follow: false } } : meta;
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = articleBySlug(slug);
  if (!a) notFound();
  const related = visibleArticles().filter((x) => x.slug !== a.slug).slice(0, 3);
  const url = `${site.url}/news/${a.slug}`;
  return (
    <>
      <article aria-labelledby="article-title" className="bg-white py-10 lg:py-[calc(32*var(--u))]">
        <div className="container-site max-w-[820px] lg:max-w-[calc(720*var(--u))]">
          <Breadcrumbs tone="light" items={[{ name: 'News & Insights', path: '/news' }, { name: a.title, path: `/news/${a.slug}` }]} />
          {a.status === 'draft' && (
            <p className="mt-6 rounded-sm border border-dashed border-[#c98a00] bg-[#fff8e6] px-4 py-2.5 text-[14px] text-[#6b4a00]">
              <strong>Draft article for layout review.</strong> It is hidden on the live site until it is approved and published.
            </p>
          )}
          <p className="eyebrow mt-6">{a.category}</p>
          <h1 id="article-title" className="mt-2 font-display text-[clamp(1.9rem,5vw,2.6rem)] font-bold leading-[1.15] text-navy">
            {a.title}
          </h1>
          <p className="mt-3 text-[14px] text-ink-2">
            {a.author}
            {a.status === 'published' && (
              <>
                {' '}
                – <time dateTime={a.publishedAt}>{formatDate(a.publishedAt)}</time>
              </>
            )}
          </p>
          <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-md">
            <Image src={a.featuredImage.src} alt={a.featuredImage.alt} fill priority sizes="(min-width: 1024px) 720px, 100vw" className="object-cover" />
          </div>
          <div className="mt-8 space-y-5 font-sans text-[17px] leading-[1.75] text-[#2d3550]">
            {a.content.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <div className="mt-10 border-t border-line pt-6">
            <ShareLinks url={url} title={a.title} />
          </div>
        </div>
        {a.status === 'published' && (
          <JsonLd
            data={{
              '@context': 'https://schema.org',
              '@type': 'Article',
              headline: a.title,
              datePublished: a.publishedAt,
              author: { '@type': 'Organization', name: a.author },
              publisher: { '@type': 'Organization', name: site.name, logo: { '@type': 'ImageObject', url: `${site.url}/brand/logo-primary.png` } },
              image: `${site.url}${a.featuredImage.src}`,
              mainEntityOfPage: url,
            }}
          />
        )}
      </article>
      {related.length > 0 && (
        <section aria-labelledby="related-articles" className="bg-gray-soft/60 py-12">
          <div className="container-site">
            <h2 id="related-articles" className="title-section">Related articles</h2>
            <ul className="mt-6 grid gap-6 md:grid-cols-3">
              {related.map((r) => (
                <li key={r.slug}>
                  <NewsCard article={r} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
      <CtaBand />
    </>
  );
}
