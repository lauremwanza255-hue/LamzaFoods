import Image from 'next/image';
import Link from 'next/link';
import { site } from '@/data/site';

type Props = {
  variant?: 'primary' | 'dark';
  className?: string;
  /** Rendered width in CSS (any length). Height follows the artwork ratio. */
  width?: string;
  priority?: boolean;
  linked?: boolean;
};

/**
 * Official Lamza Foods logo (traced from the supplied artwork, never re-typeset).
 * "primary" = navy and green for light grounds; "dark" = white lettering, green bridge-M.
 */
export function BrandLogo({ variant = 'primary', className = '', width = '145px', priority, linked = true }: Props) {
  const img = (
    <Image
      src={variant === 'dark' ? site.logo.dark : site.logo.primary}
      alt={linked ? `${site.name} home` : site.name}
      width={1036}
      height={286}
      priority={priority}
      unoptimized
      style={{ width, height: 'auto' }}
      className="block"
    />
  );
  if (!linked) return <span className={className}>{img}</span>;
  return (
    <Link href="/" className={`inline-block ${className}`}>
      {img}
    </Link>
  );
}
