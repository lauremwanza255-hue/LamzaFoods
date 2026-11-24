import Image from 'next/image';
import { Breadcrumbs, type Crumb } from './Breadcrumbs';

/**
 * Branded introductory banner for inner pages: navy ground, optional photograph on the
 * right blended in the same way as the homepage hero, and a subtle brand pattern.
 */
export function PageBanner({
  eyebrow,
  title,
  intro,
  crumbs,
  image,
  children,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  crumbs: Crumb[];
  image?: { src: string; alt: string; position?: string };
  children?: React.ReactNode;
}) {
  return (
    <section aria-labelledby="page-title" className="on-dark relative isolate overflow-hidden bg-navy text-white">
      <div aria-hidden="true" className="bg-brand-pattern absolute inset-0 -z-20 opacity-[0.07]" />
      {image && (
        <div className="absolute inset-y-0 right-0 -z-10 hidden w-[48%] md:block">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority
            sizes="48vw"
            className={`object-cover ${image.position ?? 'object-center'} [mask-image:linear-gradient(to_right,transparent_0%,rgba(0,0,0,0.6)_18%,black_40%)]`}
          />
        </div>
      )}
      <div className="container-site py-12 md:py-16 lg:py-[calc(44*var(--u))]">
        <Breadcrumbs items={crumbs} />
        <div className="mt-6 max-w-[620px] lg:mt-[calc(18*var(--u))] lg:max-w-[calc(470*var(--u))]">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h1
            id="page-title"
            className="mt-2 font-display text-[clamp(2rem,5.6vw,2.6rem)] font-bold leading-[1.12] lg:text-[calc(34*var(--u))]"
          >
            {title}
          </h1>
          <span aria-hidden="true" className="rule-green mt-5 lg:mt-[calc(14*var(--u))]" />
          {intro && (
            <p className="mt-5 max-w-[56ch] text-[16px] leading-[1.6] text-white/90 lg:mt-[calc(14*var(--u))] lg:text-[max(14px,calc(12.6*var(--u)))]">
              {intro}
            </p>
          )}
          {children}
        </div>
      </div>
    </section>
  );
}
