import type { IconName } from '@/types/content';

/**
 * Market segments Lamza Foods intends to serve. This is positioning copy, not a claim of
 * existing distribution networks, territories, warehouses or trade agreements.
 */
export type Market = {
  slug: 'canada' | 'wholesale' | 'retail' | 'export';
  name: string;
  icon: IconName;
  summary: string;
  intro: string;
  forWho: string[];
  howWeHelp: { title: string; body: string }[];
  cta: { label: string; href: string };
  image: string;
};

export const markets: Market[] = [
  {
    slug: 'canada',
    name: 'Canada',
    icon: 'store',
    summary: 'African food products for Canadian retailers, wholesalers, distributors and consumers.',
    intro:
      'Canada is home to growing African communities and to shoppers curious about African cuisine. Lamza Foods focuses on making authentic African food products easier to find in Canadian stores.',
    forWho: ['African and Caribbean grocery stores', 'Supermarkets with international aisles', 'Wholesalers and distributors', 'Restaurants and caterers'],
    howWeHelp: [
      { title: 'Products customers ask for', body: 'Dried fish, flours, baobab powder, spices and specialty foods familiar to African households.' },
      { title: 'Business inquiries', body: 'Quotes and specifications for retail and wholesale quantities on request.' },
      { title: 'One point of contact', body: 'Questions about products, packaging and orders handled by one team.' },
    ],
    cta: { label: 'Request a quote', href: '/request-a-quote' },
    image: '/images/hero/hero-food-flatlay.webp',
  },
  {
    slug: 'wholesale',
    name: 'Wholesale',
    icon: 'boxes',
    summary: 'Business-oriented product supply and wholesale inquiries.',
    intro:
      'Wholesale buyers need consistent product information and quantities that make sense for resale. Send us your requirements and we will reply with availability and terms.',
    forWho: ['Wholesalers', 'Cash and carry businesses', 'Food service suppliers', 'Buying groups'],
    howWeHelp: [
      { title: 'Quantities on request', body: 'Tell us the volumes you need and we will confirm what we can supply.' },
      { title: 'Product specifications', body: 'Ask for packaging, storage and labelling details before you order.' },
      { title: 'Repeat supply', body: 'We are building long-term supply relationships, not one-off sales.' },
    ],
    cta: { label: 'Send a wholesale inquiry', href: '/contact?subject=Wholesale%20Inquiry' },
    image: '/images/products/cassava-flour.webp',
  },
  {
    slug: 'retail',
    name: 'Retail',
    icon: 'store',
    summary: 'Supply opportunities for supermarkets, grocery stores and specialist African food retailers.',
    intro:
      'From specialist African food shops to supermarket international aisles, retailers can add authentic African products their customers recognise.',
    forWho: ['Specialist African food stores', 'Grocery stores', 'Supermarkets', 'Online grocers'],
    howWeHelp: [
      { title: 'Shelf-ready products', body: 'Ask about retail pack sizes and branded Lamza Foods packaging.' },
      { title: 'Product knowledge', body: 'Background on each product to help your staff and customers.' },
      { title: 'Range advice', body: 'Tell us about your customers and we will suggest a starting range.' },
    ],
    cta: { label: 'Become a retail partner', href: '/become-a-partner' },
    image: '/images/packaging/packaging-shopping-bag.webp',
  },
  {
    slug: 'export',
    name: 'Export',
    icon: 'ship',
    summary: 'International food supply and distribution inquiries.',
    intro:
      'Lamza Foods connects African producers with markets beyond Canada. Importers and distributors in other countries can contact us about supply.',
    forWho: ['Importers', 'International distributors', 'Exporters looking for partners', 'Food service groups'],
    howWeHelp: [
      { title: 'Supply inquiries', body: 'Share your destination, products and volumes so we can review the request.' },
      { title: 'Documentation questions', body: 'Ask which product and shipping documents are available for your market.' },
      { title: 'Distribution partnerships', body: 'We are open to partners who want to represent African food products.' },
    ],
    cta: { label: 'Send an export inquiry', href: '/contact?subject=Export' },
    image: '/images/products/african-spices.webp',
  },
];

export const marketBySlug = (slug: string) => markets.find((m) => m.slug === slug);
