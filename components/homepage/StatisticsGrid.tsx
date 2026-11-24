import { companyStats } from '@/data/site';
import { showClaim } from '@/lib/config';
import { Icon } from '@/components/ui/Icon';

/**
 * Company statistics. The figures come from the homepage reference and are editable
 * placeholders (data/site.ts) until Lamza Foods confirms them.
 */
export function StatisticsGrid({ className = '' }: { className?: string }) {
  const stats = companyStats.filter((s) => showClaim(s.value));
  if (!stats.length) return null;
  return (
    <dl className={`grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4 lg:gap-x-[calc(8*var(--u))] ${className}`}>
      {stats.map((s) => (
        <div key={s.heading} className="flex flex-col">
          <dt className="flex items-center gap-2 text-[13px] leading-tight text-white whitespace-nowrap lg:gap-[calc(6*var(--u))] lg:text-[max(11px,calc(9.4*var(--u)))]">
            <Icon name={s.icon} className="size-5 shrink-0 text-green-light lg:size-[calc(17*var(--u))]" />
            {s.heading}
          </dt>
          <dd>
            <span className="mt-2 block font-display text-[26px] font-normal leading-none text-green-light lg:mt-[calc(6*var(--u))] lg:text-[calc(21*var(--u))]">
              {s.value.value}
            </span>
            <span className="mt-1.5 block text-[13px] leading-tight text-white/85 lg:mt-[calc(5*var(--u))] lg:text-[max(11.5px,calc(9.6*var(--u)))]">
              {s.caption}
            </span>
          </dd>
        </div>
      ))}
    </dl>
  );
}
