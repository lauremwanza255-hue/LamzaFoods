import { benefits } from '@/data/site';
import { showItem } from '@/lib/config';
import { Icon } from '@/components/ui/Icon';

export function BenefitsSection() {
  const items = benefits.filter(showItem);
  return (
    <section aria-labelledby="benefits-title" className="bg-white py-14 lg:pb-[calc(20*var(--u))] lg:pt-[calc(17*var(--u))]">
      <div className="container-site">
        <div className="text-center">
          <p className="eyebrow">Why choose Lamza Foods</p>
          <h2 id="benefits-title" className="title-section mt-2 lg:mt-[calc(5*var(--u))]">
            Your trusted food partner.
          </h2>
        </div>
        <ul className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:mt-[calc(12*var(--u))] lg:grid-cols-5 lg:gap-0">
          {items.map((b, i) => (
            <li
              key={b.title}
              className={`flex flex-col items-center px-4 text-center lg:px-[calc(14*var(--u))] ${
                i > 0 ? 'lg:border-l lg:border-line-strong' : ''
              }`}
            >
              <Icon name={b.icon} className="size-10 text-green lg:size-[calc(31*var(--u))]" strokeWidth={1.25} />
              <h3 className="mt-3 font-display text-[16px] font-bold leading-tight text-navy lg:mt-[calc(9*var(--u))] lg:text-[max(12px,calc(10.6*var(--u)))]">
                {b.title}
              </h3>
              <p className="mt-1.5 max-w-[26ch] text-[16px] leading-[1.45] text-ink-2 lg:mt-[calc(5*var(--u))] lg:max-w-[calc(150*var(--u))] lg:text-[max(11.5px,calc(9.6*var(--u)))] lg:leading-[1.4]">
                {b.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
