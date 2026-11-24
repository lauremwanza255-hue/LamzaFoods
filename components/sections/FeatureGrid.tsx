import { Icon } from '@/components/ui/Icon';
import type { IconName } from '@/types/content';

export type FeatureItem = { icon: IconName; title: string; body: string };

export function FeatureGrid({ items, columns = 3 }: { items: FeatureItem[]; columns?: 2 | 3 | 4 }) {
  const cols = { 2: 'md:grid-cols-2', 3: 'md:grid-cols-2 lg:grid-cols-3', 4: 'sm:grid-cols-2 lg:grid-cols-4' }[columns];
  return (
    <ul className={`grid grid-cols-1 gap-x-8 gap-y-10 ${cols}`}>
      {items.map((it) => (
        <li key={it.title} className="border-t-2 border-green pt-5">
          <Icon name={it.icon} className="size-9 text-green" />
          <h3 className="mt-3 font-display text-[18px] font-bold leading-snug text-navy">{it.title}</h3>
          <p className="mt-2 text-[16px] leading-[1.6] text-ink-2">{it.body}</p>
        </li>
      ))}
    </ul>
  );
}
