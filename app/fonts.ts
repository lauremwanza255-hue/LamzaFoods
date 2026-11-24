import localFont from 'next/font/local';

/**
 * Self-hosted brand fonts (from @fontsource, OFL licensed). next/font preloads them and
 * generates metric-matched fallbacks, which prevents layout shift while they load.
 */
export const hindSiliguri = localFont({
  src: [
    { path: '../node_modules/@fontsource/hind-siliguri/files/hind-siliguri-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: '../node_modules/@fontsource/hind-siliguri/files/hind-siliguri-latin-500-normal.woff2', weight: '500', style: 'normal' },
    { path: '../node_modules/@fontsource/hind-siliguri/files/hind-siliguri-latin-600-normal.woff2', weight: '600', style: 'normal' },
    { path: '../node_modules/@fontsource/hind-siliguri/files/hind-siliguri-latin-700-normal.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-hind',
  display: 'swap',
  fallback: ['system-ui', 'Arial', 'sans-serif'],
});

export const libreBaskerville = localFont({
  src: [
    { path: '../node_modules/@fontsource/libre-baskerville/files/libre-baskerville-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: '../node_modules/@fontsource/libre-baskerville/files/libre-baskerville-latin-700-normal.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-baskerville',
  display: 'swap',
  fallback: ['Georgia', 'Times New Roman', 'serif'],
});
