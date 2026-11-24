'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { mainNav } from '@/data/site';
import { BrandLogo } from './BrandLogo';

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(href + '/');
}

function ProductDropdown({ item, pathname }: { item: (typeof mainNav)[number]; pathname: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();
  const active = isActive(pathname, item.href);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openedByHover = useRef(false);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && open) {
      setOpen(false);
      buttonRef.current?.focus();
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!open) setOpen(true);
      requestAnimationFrame(() => {
        const links = ref.current?.querySelectorAll<HTMLAnchorElement>('[role="menu"] a');
        if (!links?.length) return;
        const list = Array.from(links);
        const idx = list.indexOf(document.activeElement as HTMLAnchorElement);
        list[(idx + 1) % list.length].focus();
      });
    }
    if (e.key === 'ArrowUp' && open) {
      e.preventDefault();
      const list = Array.from(ref.current?.querySelectorAll<HTMLAnchorElement>('[role="menu"] a') ?? []);
      const idx = list.indexOf(document.activeElement as HTMLAnchorElement);
      list[(idx - 1 + list.length) % list.length]?.focus();
    }
  };

  return (
    <li
      ref={ref}
      className="relative flex h-full items-center"
      onMouseEnter={() => {
        if (closeTimer.current) clearTimeout(closeTimer.current);
        if (!open) openedByHover.current = true;
        setOpen(true);
      }}
      onMouseLeave={() => {
        closeTimer.current = setTimeout(() => {
          openedByHover.current = false;
          setOpen(false);
        }, 160);
      }}
      onKeyDown={onKeyDown}
      onBlur={(e) => {
        if (!ref.current?.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        className={`nav-link flex items-center gap-[0.35em] ${active ? 'is-active' : ''}`}
        aria-expanded={open}
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={() => {
          // A click right after hover-opening keeps the menu open instead of toggling it shut.
          if (openedByHover.current) {
            openedByHover.current = false;
            setOpen(true);
            return;
          }
          setOpen((v) => !v);
        }}
      >
        {item.label}
        <ChevronDown aria-hidden="true" className={`size-[1.15em] transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      <ul
        id={menuId}
        role="menu"
        aria-label="Products"
        className={`absolute left-[-14px] top-full z-50 min-w-[210px] rounded-sm border border-line bg-white py-2 shadow-[0_10px_30px_rgba(26,36,83,0.12)] transition duration-150 ${
          open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-1 opacity-0'
        }`}
      >
        {item.children!.map((c) => (
          <li key={c.href} role="none">
            <Link
              role="menuitem"
              href={c.href}
              aria-current={pathname === c.href ? 'page' : undefined}
              className="block px-4 py-2.5 text-[14px] font-medium text-navy hover:bg-gray-soft hover:text-green focus-visible:bg-gray-soft aria-[current=page]:text-green"
            >
              {c.label}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
}

function MobileNavigation({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.classList.toggle('menu-open', open);
    if (!open) return;
    const first = panelRef.current?.querySelector<HTMLElement>('a, button');
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'Tab' && panelRef.current) {
        const items = Array.from(panelRef.current.querySelectorAll<HTMLElement>('a, button')).filter(
          (el) => el.offsetParent !== null,
        );
        const all = [toggleRef.current!, ...items];
        const idx = all.indexOf(document.activeElement as HTMLElement);
        if (e.shiftKey && idx <= 0) {
          e.preventDefault();
          all[all.length - 1].focus();
        } else if (!e.shiftKey && idx === all.length - 1) {
          e.preventDefault();
          all[0].focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.classList.remove('menu-open');
    };
  }, [open, close]);

  return (
    <div className="lg:hidden">
      <button
        ref={toggleRef}
        type="button"
        className="relative z-[60] -mr-2 inline-flex size-11 items-center justify-center rounded-sm text-navy"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <X aria-hidden="true" className="size-6" /> : <Menu aria-hidden="true" className="size-6" />}
      </button>
      <div
        id={panelId}
        ref={panelRef}
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-[64px] z-50 overflow-y-auto border-t border-line bg-white"
      >
        <nav aria-label="Main" className="container-site flex min-h-full flex-col py-4">
          <ul className="divide-y divide-line">
            {mainNav.map((item) =>
              item.children ? (
                <li key={item.href}>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between py-4 text-left text-[17px] font-semibold uppercase text-navy"
                    aria-expanded={productsOpen}
                    onClick={() => setProductsOpen((v) => !v)}
                  >
                    {item.label}
                    <ChevronDown aria-hidden="true" className={`size-5 transition-transform ${productsOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <ul hidden={!productsOpen} className="pb-3 pl-4">
                    {item.children.map((c) => (
                      <li key={c.href}>
                        <Link
                          href={c.href}
                          aria-current={pathname === c.href ? 'page' : undefined}
                          className="block py-3 text-[16px] font-medium text-navy aria-[current=page]:text-green"
                        >
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(pathname, item.href) ? 'page' : undefined}
                    className="block py-4 text-[17px] font-semibold uppercase text-navy aria-[current=page]:text-green"
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
          <Link href="/become-a-partner" className="btn btn-primary mt-6 w-full">
            Become a Partner
            <ArrowRight aria-hidden="true" className="btn-arrow" />
          </Link>
        </nav>
      </div>
    </div>
  );
}

export function Header() {
  const pathname = usePathname() || '/';
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white">
      <div className="container-header flex h-16 items-center justify-between gap-6 lg:h-[calc(74*var(--u))]">
        <BrandLogo priority width="clamp(124px, calc(145 * var(--u)), 200px)" />
        <nav aria-label="Main" className="hidden h-full lg:block">
          <ul className="flex h-full items-center gap-[calc(28*var(--u))]">
            {mainNav.map((item) =>
              item.children ? (
                <ProductDropdown key={item.href} item={item} pathname={pathname} />
              ) : (
                <li key={item.href} className="flex h-full items-center">
                  <Link
                    href={item.href}
                    aria-current={isActive(pathname, item.href) ? 'page' : undefined}
                    className={`nav-link ${isActive(pathname, item.href) ? 'is-active' : ''}`}
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>
        <Link href="/become-a-partner" className="btn btn-primary btn-sm hidden lg:inline-flex">
          Become a Partner
        </Link>
        <MobileNavigation pathname={pathname} />
      </div>
    </header>
  );
}
