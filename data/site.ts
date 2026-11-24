import type { Claim, Feature, NavItem, NavLink, Stat } from '@/types/content';

/**
 * Central company settings. Edit business information here, never inside components.
 * `verified: false` marks reference or draft content that Lamza Foods must confirm
 * before launch (see docs/CONTENT-VERIFICATION.md).
 */
export const site = {
  name: 'Lamza Foods',
  legalName: 'Lamza Foods',
  tagline: 'Bringing Africa’s finest foods to the world.',
  shortDescription:
    'Lamza Foods sources, processes and delivers high-quality African food products to retailers, wholesalers and consumers across Canada and beyond.',
  footerBlurb: 'Bringing Africa’s finest foods to the world with quality, integrity and care.',
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, ''),
  logo: {
    primary: '/brand/logo-primary.svg',
    dark: '/brand/logo-dark.svg',
    icon: '/brand/brand-icon.svg',
    /** intrinsic ratio of the traced logo artwork */
    ratio: 4144 / 1144,
  },
  contact: {
    email: { value: 'info@lamzafoods.com', verified: false, source: 'homepage reference' } as Claim,
    phone: {
      value: '+1 (780) 123 4567',
      verified: false,
      source: 'homepage reference (appears to be a placeholder number)',
    } as Claim,
    phoneHref: 'tel:+17801234567',
    location: { value: 'Edmonton, Alberta, Canada', verified: false, source: 'homepage reference' } as Claim,
    locationLines: ['Edmonton, Alberta', 'Canada'],
    /** No street address has been supplied, so no map is shown. */
    streetAddress: null as Claim | null,
  },
  /** Add verified profile URLs. Icons without a URL render as inactive placeholders. */
  social: [
    { name: 'Facebook', url: null as string | null },
    { name: 'Instagram', url: null as string | null },
    { name: 'LinkedIn', url: null as string | null },
    { name: 'YouTube', url: null as string | null },
  ],
  copyrightStartYear: 2026,
};

export const mainNav: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  {
    label: 'Products',
    href: '/products',
    children: [
      { label: 'All Products', href: '/products' },
      { label: 'Dried Fish', href: '/products/category/dried-fish' },
      { label: 'Flours & Powders', href: '/products/category/flours-powders' },
      { label: 'African Spices', href: '/products/category/african-spices' },
      { label: 'Other Products', href: '/products/category/other-products' },
    ],
  },
  { label: 'Our Process', href: '/our-process' },
  { label: 'Markets', href: '/markets' },
  { label: 'News & Insights', href: '/news' },
  { label: 'Contact Us', href: '/contact' },
];

export const footerColumns: { heading: string; links: NavLink[] }[] = [
  {
    heading: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Our Process', href: '/our-process' },
      { label: 'Our Partners', href: '/partners' },
      { label: 'Careers', href: '/careers' },
    ],
  },
  {
    heading: 'Products',
    links: [
      { label: 'All Products', href: '/products' },
      { label: 'Dried Fish', href: '/products/category/dried-fish' },
      { label: 'Flours & Powders', href: '/products/category/flours-powders' },
      { label: 'Spices', href: '/products/category/african-spices' },
      { label: 'Other Products', href: '/products/category/other-products' },
    ],
  },
  {
    heading: 'Markets',
    links: [
      { label: 'Canada', href: '/markets/canada' },
      { label: 'Wholesale', href: '/markets/wholesale' },
      { label: 'Retail', href: '/markets/retail' },
      { label: 'Export', href: '/markets/export' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Food Safety', href: '/food-safety' },
      { label: 'Certifications', href: '/certifications' },
      { label: 'FAQs', href: '/faqs' },
      { label: 'Documents', href: '/documents' },
    ],
  },
];

/** Trust bar under the hero. Operational claims are reference copy pending confirmation. */
export const trustFeatures: Feature[] = [
  {
    icon: 'sprout',
    title: 'Carefully Sourced',
    description: 'We work directly with farmers and trusted suppliers across Africa.',
    verified: false,
  },
  {
    icon: 'shield-check',
    title: 'Premium Quality',
    description: 'Strict quality control ensures safe and authentic products.',
    verified: false,
  },
  {
    icon: 'globe',
    title: 'Global Standards',
    description: 'We meet international food safety and compliance standards.',
    verified: false,
  },
  {
    icon: 'truck',
    title: 'Reliable Delivery',
    description: 'Timely and efficient delivery to your business.',
    verified: false,
  },
];

/** Figures transcribed from the homepage reference. Placeholders until confirmed. */
export const companyStats: Stat[] = [
  {
    icon: 'users',
    heading: 'Direct Partnerships',
    value: { value: '100+', verified: false, source: 'homepage reference' },
    caption: 'Farmers & Suppliers',
  },
  {
    icon: 'badge-check',
    heading: 'Quality Control',
    value: { value: '100%', verified: false, source: 'homepage reference' },
    caption: 'Tested & Verified',
  },
  {
    icon: 'package',
    heading: 'Products',
    value: { value: '50+', verified: false, source: 'homepage reference' },
    caption: 'Quality Products',
  },
  {
    icon: 'globe',
    heading: 'Markets',
    value: { value: '2+', verified: false, source: 'homepage reference' },
    caption: 'Countries',
  },
];

export const benefits: Feature[] = [
  { icon: 'leaf', title: 'Authentic Products', description: 'Bringing you the true taste of Africa.', verified: true },
  {
    icon: 'shield-check',
    title: 'Food Safety',
    description: 'We follow strict food safety and hygiene standards.',
    verified: false,
  },
  { icon: 'handshake', title: 'Reliable Supply', description: 'Consistent quality and on-time delivery.', verified: false },
  { icon: 'globe', title: 'Global Reach', description: 'Serving markets in Canada and beyond.', verified: false },
  {
    icon: 'hand-heart',
    title: 'Sustainable Impact',
    description: 'Supporting communities and sustainable growth.',
    verified: false,
  },
];

export const businessTypes = [
  'Retailer',
  'Wholesaler',
  'Distributor',
  'Importer',
  'Exporter',
  'Restaurant',
  'Hospitality business',
  'Supermarket',
  'Other',
] as const;

export const inquirySubjects = [
  'General Inquiry',
  'Product Inquiry',
  'Wholesale Inquiry',
  'Distribution',
  'Partnership',
  'Export',
  'Other',
] as const;

export const contactMethods = ['Email', 'Phone', 'Either'] as const;

export const orderVolumes = [
  'Sample / trial order',
  'Under 500 kg per month',
  '500 kg – 2 tonnes per month',
  'Over 2 tonnes per month',
  'Not sure yet',
] as const;
