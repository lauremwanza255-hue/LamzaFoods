import Image from 'next/image';
import Link from 'next/link';
import type { NewsArticle } from '@/types/content';

export function formatDate(iso: string) {
  return new Date(iso + 'T12:00:00Z').toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
}

export function NewsCard({ article, featured = false }: { article: NewsArticle; featured?: boolean }) {
  return (
    <article className={`group relative flex h-full overflow-hidden rounded-md border border-line-strong bg-white ${featured ? 'flex-col md:flex-row' : 'flex-col'}`}>
      <div className={`relative overflow-hidden bg-gray-soft ${featured ? 'aspect-[16/10] md:aspect-auto md:w-1/2' : 'aspect-[16/10]'}`}>
        <Image src={article.featuredImage.src} alt={article.featuredImage.alt} fill sizes={featured ? '(min-width: 768px) 45vw, 100vw' : '(min-width: 768px) 30vw, 100vw'} className="object-cover transition-transform duration-300 group-hover:scale-[1.02]" />
      </div>
      <div className={`flex flex-1 flex-col p-6 ${featured ? 'md:p-8' : ''}`}>
        <p className="eyebrow">{article.category}</p>
        <h2 className={`mt-2 font-display font-bold leading-snug text-navy ${featured ? 'text-[24px]' : 'text-[19px]'}`}>
          <Link href={`/news/${article.slug}`} className="after:absolute after:inset-0">
            {article.title}
          </Link>
        </h2>
        <p className="mt-3 text-[15px] leading-[1.6] text-ink-2">{article.excerpt}</p>
        <p className="mt-auto pt-4 text-[13px] text-ink-2">
          {article.status === 'draft' ? (
            <span className="rounded-sm bg-[#fff8e6] px-2 py-0.5 font-semibold text-[#6b4a00]">Draft – not published</span>
          ) : (
            <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
          )}
        </p>
      </div>
    </article>
  );
}
