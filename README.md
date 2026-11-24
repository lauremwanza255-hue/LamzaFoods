# Lamza Foods website

Corporate product catalogue and business-to-business lead generation site for **Lamza Foods**:
*Bringing Africa’s finest foods to the world.*

Built with Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS 4 and Zod. There is no
shopping cart or checkout.

- `docs/CONTENT-VERIFICATION.md`: everything Lamza Foods must confirm before launch
- `docs/TEST-REPORT.md`: functional, accessibility, performance and visual test results
- `docs/visual-qa/`: homepage compared with the supplied reference, and screenshots at each breakpoint

## Quick start

```bash
npm install
cp .env.example .env.local
npm run dev            # http://localhost:3000
```

To try the forms locally, set `INQUIRY_DEV_FILE_STORE=true` in `.env.local`. Submissions are then
written to `.data/inquiries.jsonl`. Without any delivery channel the forms say, honestly, that the
inquiry was **not** sent.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` / `npm start` | Production build / server |
| `npm run lint` | ESLint (Next.js core-web-vitals + TypeScript rules) |
| `npm run typecheck` | TypeScript, no emit |
| `npm test` | Vitest unit tests (schemas, rate limiter, inquiry API) |
| `npm run test:e2e` | Playwright end-to-end tests with axe accessibility checks (run `npm run build` first) |
| `npm run brand:build` | Rebuild logo, icon, favicon and pattern files from `assets-src/reference/logo-supplied.jpg` |
| `npm run images:build` | Rebuild optimised photography from `assets-src/` |
| `node scripts/visual-compare.cjs <url>` | Homepage at 1024px beside the supplied reference |
| `node scripts/screenshots.cjs <url>` | Full-page screenshots of key routes at 1440/1024/768/390 |

## Environment variables

See `.env.example`. Never commit real values.

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for metadata, sitemap and social cards |
| `SITE_INDEXING` | `true` only on the approved production deployment. Otherwise `noindex` + `Disallow: /` |
| `NEXT_PUBLIC_HIDE_UNVERIFIED` | `true` hides every value still marked unverified |
| `SHOW_DRAFT_CONTENT` | `true` shows draft news articles and draft-copy notices in a production build (for review deployments) |
| `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` | Store inquiries in PostgreSQL (create the table with `docs/supabase-schema.sql`) |
| `RESEND_API_KEY`, `CONTACT_EMAIL`, `FROM_EMAIL` | Email each inquiry to the business and send the customer a confirmation |
| `INQUIRY_DEV_FILE_STORE` | Local development only: JSON-lines file store (ignored when `NODE_ENV=production`) |

## Inquiry handling

`POST /api/inquiries` (`app/api/inquiries/route.ts`) handles contact, partnership, wholesale,
product and quote inquiries:

1. JSON only, same-origin only, 32 KB body limit.
2. Rate limit: 5 submissions per 10 minutes per IP. This is kept in memory, so on serverless
   hosts each instance has its own count; add a shared store or WAF rule for stricter limits.
3. Spam traps: a hidden honeypot field, and submissions made within 2.5 s of the form loading are rejected.
4. Zod validation, shared with the browser (`lib/inquiry/schema.ts`). Control characters are
   stripped and lengths capped; field errors are returned for each field.
5. Delivery (`lib/inquiry/delivery.ts`) to every configured channel: Supabase insert, Resend
   notification email (values HTML-escaped), dev file store.
6. **Success only when at least one channel confirms receipt.** The response carries a reference
   such as `LMZ-260124-3FA9C1`. With no channel configured it returns 503 `not_configured`; if
   every channel fails it returns 502.

Secrets are only read on the server. The service-role key is never sent to the browser.

## Project structure

```text
app/                 routes (App Router), API route, sitemap, robots, icons, fonts
components/
  layout/            Header (desktop dropdown + mobile menu), Footer, BrandLogo
  homepage/          Hero, TrustBar, FeaturedProducts, About, StatisticsGrid, Benefits, PartnershipBanner
  products/          ProductCard, ProductCatalogue (search + filters), ProductGallery
  forms/             ContactForm, PartnershipForm, QuoteRequestForm, fields, FormShell, useInquiry
  sections/          CtaBand, FeatureGrid, FAQAccordion, NewsCard, ShareLinks, Prose, notices
  ui/                Icon, PageBanner, Breadcrumbs, SectionHeading, EmptyState, Alert, JsonLd
data/                site settings, products, markets, FAQs, news (all editable content)
lib/                 config flags, SEO helpers, inquiry schema/delivery/rate limit
types/               content models
public/brand/        logo-primary/dark (svg+png), brand-icon, brand-pattern, favicons
public/images/       optimised WebP photography + social card
assets-src/          reference images, crops, upscales (sources for the build scripts)
scripts/             brand/image builders, visual QA and screenshot scripts
tests/unit, tests/e2e
docs/                verification checklist, test report, Supabase schema, visual QA
```

## Design system

- **Colours** (official palette): Deep Navy `#1A2453`, Fresh Green `#38853F`, Soft Gray
  `#EBEBED`, White. Tokens are in `app/globals.css`. There are tonal variations for
  accessibility only:
  - `#6CC174` for small green text on navy (6.7:1)
  - `#317A38` for small green text on white or grey (5.3:1)
  - `#2E7034` for button hover
- **Type**: Hind Siliguri 400–700 (official corporate face) for all UI and body text; Libre
  Baskerville 400/700 as the website display serif for headlines. Both are self-hosted through
  `next/font/local` from `@fontsource` (OFL), with metric-matched fallbacks so text does not shift
  while fonts load.
- **Reference unit**: from 1024px up, every desktop measurement is written as reference pixels
  × `--u` (`min(100vw/1024, 1.36px)`). The layout therefore matches the 1024×1536 reference
  proportionally and scales up to wide screens. Tablet and mobile layouts are designed
  separately. Body text never goes below 11.5–12px, even where the reference uses 9–10px.
- **Logo**: always the traced artwork (`BrandLogo`), never typeset. The light version is used in
  the header and the dark version (white letters, green bridge-M) in the footer.

## Photography

**Photo sources.** The build environment could not reach any stock or image-generation service,
so every photograph comes from the supplied artwork:

| Photo | Source |
|---|---|
| Hero, six products, farmland, handshake | Cropped from the homepage reference (1024×1536) |
| Farmland | The baked-in "Quality you can trust" panel was removed by mirroring the crop rows |
| Three packaging mock-ups (About page) | Cropped from the brand guide |

**Upscaling.** Products, handshake and farmland were upscaled 4× with ESRGAN (UpscalerJS, MIT).
The hero was resized with Lanczos. `assets-src/image-build-report.json` lists the source of each
file.

**What this means.** These images look right but are soft on large and high-density screens.
To replace them, put the original full-resolution files in `assets-src/originals/` with the same
names (e.g. `hero.jpg`, `cassava-flour.jpg`, `farmland.jpg`) and run `npm run images:build`.
Originals take priority automatically.

## Deployment (Vercel)

1. Import the repository in Vercel (framework preset: Next.js).
2. Add the environment variables for the production environment:
   - `SITE_INDEXING=true` and `NEXT_PUBLIC_SITE_URL` (production only)
   - a delivery channel: Supabase and/or Resend
3. For Supabase, run `docs/supabase-schema.sql` once.
4. For Resend, verify the sending domain and use an address on it as `FROM_EMAIL`.
5. Preview deployments keep `SITE_INDEXING` unset, so they are never indexed.

The app also runs on any Node 20+ host with `npm run build && npm start`.

## Remaining configuration

- Delivery credentials (Supabase and/or Resend). Until these are set, forms correctly report that inquiries were not sent.
- Verified phone, email, social URLs and production domain.
- Original vector logo files and high-resolution photography.
- Verification of every item in `docs/CONTENT-VERIFICATION.md`.
- Legal review of the Privacy Policy and Terms of Use.
- Optional: a CMS or admin area for products, news and inquiries. Content is currently a typed
  local data layer in `data/`, and inquiries can be managed in the Supabase table editor.
