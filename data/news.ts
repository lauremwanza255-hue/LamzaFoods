import type { NewsArticle, NewsCategory } from '@/types/content';

export const newsCategories: NewsCategory[] = [
  'Company Updates',
  'African Food',
  'Agriculture',
  'Product Highlights',
  'Food Quality',
  'Sustainability',
  'Market Insights',
];

/**
 * News & Insights content.
 *
 * Only `published` articles appear on the live site. The two drafts below are general
 * product explainers (no company announcements, dates of events or achievements) used
 * to review the article layout. They render only when SHOW_DRAFT_CONTENT=true or in
 * `next dev`, always with a visible draft notice.
 */
export const articles: NewsArticle[] = [
  {
    id: 'n-draft-001',
    slug: 'what-is-baobab-powder',
    title: 'What is baobab powder and how is it used?',
    category: 'Product Highlights',
    excerpt:
      'The baobab fruit dries on the tree inside a hard shell. Its pulp is milled into a tangy powder used in drinks, porridges and baking.',
    content: [
      'The baobab tree grows across much of sub-Saharan Africa. Its fruit is unusual: the pulp dries naturally inside a hard, velvety shell while the fruit is still on the branch.',
      'Once the shells are cracked open, the dry pulp is separated from the seeds and fibres and milled into a fine beige powder with a sharp, citrus-like taste.',
      'In many regions the powder is stirred into water or milk as a drink, added to porridge, or used in sauces. In Canadian kitchens it is often blended into smoothies or used in baking.',
      'Lamza Foods supplies baobab powder to retailers and wholesalers. Contact our team for pack sizes and specifications.',
    ],
    featuredImage: {
      src: '/images/products/baobab-powder.webp',
      alt: 'Beige baobab fruit powder in a bowl surrounded by baobab pods',
      width: 552,
      height: 448,
    },
    publishedAt: '2026-01-01',
    author: 'Lamza Foods',
    status: 'draft',
  },
  {
    id: 'n-draft-002',
    slug: 'cooking-with-dried-fish',
    title: 'Cooking with dried fish: a short guide for retailers',
    category: 'African Food',
    excerpt:
      'Dried and smoked fish add depth to soups and stews across Africa. A short guide to how customers prepare catfish and usipa.',
    content: [
      'Dried and smoked fish are pantry staples in many African households. They keep well and bring a deep, savoury flavour to soups, stews and sauces.',
      'Smoked catfish is usually soaked, cleaned and broken into pieces before it goes into a pot of soup or stew. Small dried fish such as usipa from Lake Malawi are often rinsed and cooked whole with tomato and onion.',
      'For retailers, clear labelling of the fish type and preparation tips helps customers who are new to these products.',
      'Ask the Lamza Foods team about available dried fish products for your store.',
    ],
    featuredImage: {
      src: '/images/products/dried-smoked-catfish.webp',
      alt: 'Whole dried and smoked catfish on a rustic wooden board',
      width: 552,
      height: 448,
    },
    publishedAt: '2026-01-01',
    author: 'Lamza Foods',
    status: 'draft',
  },
];

export const showDrafts = () => process.env.SHOW_DRAFT_CONTENT === 'true' || process.env.NODE_ENV === 'development';

export const visibleArticles = () =>
  articles
    .filter((a) => a.status === 'published' || showDrafts())
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

export const articleBySlug = (slug: string) => visibleArticles().find((a) => a.slug === slug);
