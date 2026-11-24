# Test report

Run in the build container (Linux, Node 22, Chromium 1243 via Playwright 1.63) against a
production build (`next build && next start`).

## Summary

| Check | Command | Result |
|---|---|---|
| Lint | `npm run lint` | Pass, 0 problems |
| Types | `npm run typecheck` | Pass |
| Production build | `npm run build` | Pass. 39 routes, 34 prerendered; ~111 kB first-load JS on most pages |
| Unit tests | `npm test` | **17/17 pass** |
| End-to-end tests | `npm run test:e2e` | **53/53 pass** (desktop Chromium + Pixel 7 emulation) |
| Accessibility (axe, WCAG 2.2 AA tags) | in e2e | 0 serious/critical violations on 14 key pages |
| Lighthouse | see below | Accessibility 100, Best practices 100, SEO 100 (indexing on) |

Firefox and WebKit are not installed in this environment, so cross-browser runs were **not**
performed. Run `npx playwright install firefox webkit` and add the projects to
`playwright.config.ts` to cover them.

## Unit tests (Vitest)

- **Schemas:**
  - valid contact, partnership and quote inquiries are accepted;
  - consent is required;
  - email and phone formats are checked;
  - input is trimmed and control characters stripped;
  - quotes need product lines, and unknown products are rejected;
  - the honeypot and length limits work.
- **Rate limiter:** blocks after the limit, resets after the window, and counts each key separately.
- **`POST /api/inquiries`:**
  - **503 `not_configured` with no delivery channel (no fake success);**
  - 201 with an `LMZ-YYMMDD-XXXXXX` reference when a channel is configured, and the record is
    actually written;
  - 422 with errors for each field;
  - 400 for the honeypot and too-fast submissions;
  - 403 cross-origin, 415 non-JSON, 413 oversized;
  - 429 with `Retry-After`;
  - 502 when every channel fails.

## End-to-end tests (Playwright)

- **Homepage:**
  - the eight sections appear in the reference order, and the six products in the reference order;
  - it uses the official logo files, navy and green values and both fonts;
  - there is no horizontal overflow at 1920, 1440, 1280, 1024, 768, 390, 375 and 320 px;
  - the hero buttons link to the right pages.
- **Navigation:**
  - the Products dropdown opens with Enter and Arrow keys, closes with Escape and returns focus;
  - opening it by hover and then clicking keeps it open, and the menu links work;
  - the active link is marked;
  - the skip link works;
  - every internal link on the homepage and in the footer returns 200;
  - the custom 404 page works.
- **Mobile (Pixel 7):**
  - the hamburger menu opens, locks page scroll, expands the product categories, closes with
    Escape and navigates;
  - buttons and inputs are at least 40 px tall;
  - there is no overflow.
- **Catalogue:**
  - search filters the product count;
  - an empty state appears when nothing matches, and clearing resets the search;
  - category routes filter correctly.
- **Product pages:**
  - no invented prices or specifications;
  - "Request a quote" preselects the product, and "Wholesale inquiry" preselects the subject and product.
- **Forms:**
  - accessible error summary with focus, `aria-invalid` and messages beside each field;
  - with the real (unconfigured) backend the form shows **"Your inquiry was not sent"**;
  - success appears only with a server reference;
  - the submit button is disabled while sending;
  - server field errors are shown beside the right fields;
  - partnership product choices allow several selections;
  - quote lines can be added and removed.
- **FAQ** accordion opens and closes.
- **SEO and security:**
  - unique titles, descriptions, canonical URLs and Open Graph images on every page, and one `h1` per page;
  - Organization JSON-LD;
  - staging sends `noindex`, robots.txt says `Disallow: /`, and the sitemap leaves out drafts;
  - draft articles return 404 in production;
  - CSP, `nosniff`, Referrer-Policy and no `X-Powered-By`;
  - every image has alt text, the hero image is not lazy-loaded and below-the-fold images are.

## UI/UX Pro Max audit

The site was audited against the `ui-ux-pro-max` skill's priority checklist (accessibility, touch,
performance, style, layout, forms). The skill's generated design system suggested a slate-navy and
blue palette with Plus Jakarta Sans. That was **not adopted**, because the official brand guide
takes precedence. Its structural guidance matched the build (trust-first layout, quote-led calls
to action, high contrast, visible focus).

Gaps found and fixed:

| Rule | Finding | Fix |
|---|---|---|
| `error-summary` (high) | Summary listed problems without links | Each item links to its field and moves focus there |
| `inline-validation` (medium) | Validation only ran on submit | Fields are checked on blur once they have a value (or already show an error). The summary appears only after a failed submit |
| `readable-font-size` (high) | Some mobile body text was 14–15 px | Mobile body copy raised to 16 px. Desktop reference sizes unchanged |
| `cursor-pointer` | Tailwind 4 resets buttons to the default cursor | Pointer cursor restored on buttons, summaries, checkbox labels and selects |
| `tap-delay` | No `touch-action` | `touch-action: manipulation` on interactive elements |

Three new e2e tests cover these fixes: summary links focus their fields, on-blur validation (with no
errors from tabbing through empty fields), and the pointer cursor.

## Lighthouse 12 (mobile emulation, simulated slow 4G)

Production build with `SITE_INDEXING=true`, as the live site would run:

| Page | Performance | Accessibility | Best practices | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| `/` | 91 | 100 | 100 | 100 | 3.4 s | 0 | 120 ms |
| `/become-a-partner` | 95 | 100 | 100 | 100 | 2.7 s | 0 | 120 ms |

Staging build (indexing off; SEO is 69 only because `noindex` is intentional):

| Page | Performance | Accessibility | Best practices | LCP | CLS |
|---|---|---|---|---|---|
| `/products` | 95 | 100 | 100 | 2.8 s | 0 |
| `/products/cassava-flour` | 97 | 100 | 100 | 2.5 s | 0 |

Notes:

- **Largest Contentful Paint.** The 2.5 s target is not met on the homepage under Lighthouse's
  simulated slow-4G mobile profile (3.4 s). The LCP element is the hero photograph, which is
  already prioritised (`fetchpriority=high`, AVIF/WebP, responsive sizes). On a typical
  connection it loads far faster. Hosting on a CDN such as Vercel's edge network also lowers
  time to first byte, which was ~0.5 s on this local server.
- **Fixes made after earlier runs:**
  - layout shift from font swapping (0.17 → 0) was removed by moving to `next/font/local`
    with metric-matched fallbacks;
  - a CSP report caused by Zod's runtime code generation was removed by enabling `jitless`.

## Visual comparison with the reference (1024 px)

`docs/visual-qa/compare-reference-vs-build.png` places the supplied reference (left) beside the
build (right). Section heights at 1024 px:

| Section | Reference | Build | Note |
|---|---:|---:|---|
| Header | 74 | 75 | |
| Hero | 367 | 367 | |
| Trust bar | 94 | 97 | |
| Featured products | 332 | 344 | |
| About | 257 | 276 | |
| Why choose | 170 | 188 | |
| Partnership banner | 87 | 94 | |
| Footer | 155 | 207 | |
| **Total** | **1536** | **1649** | |

The build is ~7% taller. Most of the difference is deliberate:

- **Text size:** the reference sets supporting text at 9–10 px. The build keeps it at
  11.5–12 px minimum for readability.
- **Touch targets:** footer links are at least 24 px tall to meet WCAG 2.2's target-size rule.
- **Colours:** the reference's navy is darker (≈ `#0A1A3A`). The build uses the official
  `#1A2453`, as the brief requires.
- **Fonts:** Libre Baskerville is the chosen stand-in for the reference's serif; the headline
  line breaks match.
- **Photos:** they come from the reference itself, so composition matches; sharpness is limited
  by the source resolution (see README → Photography).

Remaining visual differences:

- the reference's social icons are filled glyphs, while the build uses outline glyphs in white circles;
- the reference's header and footer logos are the mock-up's lettering, while the build uses the
  official traced logo, as required.
