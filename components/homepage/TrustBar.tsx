import { trustFeatures } from '@/data/site';
import { showItem } from '@/lib/config';
import { Icon } from '@/components/ui/Icon';

export function TrustBar() {
  const items = trustFeatures.filter(showItem);
  if (!items.length) return null;
  return (
    <section aria-label="Why businesses work with Lamza Foods" className="on-dark bg-navy text-white">
      <div className="border-t border-white/10">
        <ul className="container-site grid grid-cols-1 gap-y-6 py-10 sm:grid-cols-2 sm:gap-x-8 lg:min-h-[calc(94*var(--u))] lg:grid-cols-4 lg:gap-0 lg:py-[calc(14*var(--u))]">
          {items.map((f, i) => (
            <li
              key={f.title}
              className={`flex items-center gap-4 lg:gap-[calc(12*var(--u))] ${
                i > 0 ? 'lg:border-l lg:border-white/15 lg:pl-[calc(24*var(--u))]' : ''
              } ${i < items.length - 1 ? 'lg:pr-[calc(12*var(--u))]' : ''}`}
            >
              <span className="flex size-12 shrink-0 items-center justify-center text-green-light lg:size-[calc(42*var(--u))]">
                {f.icon === 'sprout' ? (
                  <span className="flex size-full items-center justify-center rounded-full border-[1.5px] border-current">
                    <Icon name="sprout" className="size-[55%]" />
                  </span>
                ) : (
                  <Icon name={f.icon} className="size-full" />
                )}
              </span>
              <div>
                <h2 className="text-[15px] font-semibold leading-tight lg:text-[max(12.5px,calc(11*var(--u)))]">{f.title}</h2>
                <p className="mt-1 text-[16px] leading-[1.45] text-white/85 lg:mt-[calc(4*var(--u))] lg:max-w-[calc(178*var(--u))] lg:text-[max(11.5px,calc(9.6*var(--u)))] lg:leading-[1.4]">
                  {f.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
