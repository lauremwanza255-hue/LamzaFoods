import Link from 'next/link';
import { Icon } from './Icon';
import type { IconName } from '@/types/content';

export function EmptyState({
  icon = 'file-text',
  title,
  body,
  action,
}: {
  icon?: IconName;
  title: string;
  body: string;
  action?: { label: string; href: string };
}) {
  return (
    <div className="rounded-md border border-line-strong bg-gray-soft/50 px-6 py-10 text-center sm:px-10">
      <Icon name={icon} className="mx-auto size-10 text-green" />
      <h3 className="mt-4 font-display text-[20px] font-bold text-navy">{title}</h3>
      <p className="mx-auto mt-2 max-w-[52ch] text-[15px] leading-[1.6] text-ink-2">{body}</p>
      {action && (
        <Link href={action.href} className="btn btn-primary mt-6">
          {action.label}
        </Link>
      )}
    </div>
  );
}
