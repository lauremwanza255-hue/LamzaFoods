// Builds the Lamza Foods brand assets from the supplied logo artwork
// (assets-src/reference/logo-supplied.jpg).
//
// The supplied logo is a flat two-colour raster. Each colour layer is isolated,
// upscaled and traced with potrace, then filled with the official brand colours.
// This is a trace of the supplied artwork, not a redrawing. Replace the output
// with the designer's original vector files as soon as they are available.
import sharp from 'sharp';
import potrace from 'potrace';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const SRC = path.join(ROOT, 'assets-src/reference/logo-supplied.jpg');
const OUT = path.join(ROOT, 'public/brand');
const APP = path.join(ROOT, 'app');

const NAVY = '#1A2453';
const GREEN = '#38853F';
const WHITE = '#FFFFFF';
const SCALE = 4; // trace at 4x for smooth curves

const { data, info } = await sharp(SRC).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H } = info;

const isNavy = (r, g, b) => b > r + 10 && r < 120 && g < 120 && b < 170;
const isGreen = (r, g, b) => g > r + 25 && g > b + 15;

function bbox(test) {
  let x0 = W, y0 = H, x1 = 0, y1 = 0;
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const i = (y * W + x) * 3;
    if (test(data[i], data[i + 1], data[i + 2], x, y)) {
      if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y;
    }
  }
  return { x0, y0, x1, y1 };
}

// Soft mask as a greyscale image (shape = black). Each pixel is projected onto the
// line between white and the layer's sampled ink colour, so anti-aliased edges keep
// their coverage and pixels of the other ink colour are rejected.
function sampleInk(test) {
  let r = 0, g = 0, b = 0, n = 0;
  for (let i = 0; i < data.length; i += 3) {
    if (test(data[i], data[i + 1], data[i + 2])) { r += data[i]; g += data[i + 1]; b += data[i + 2]; n++; }
  }
  return [r / n, g / n, b / n];
}
function maskImage(test, box) {
  const ink = test === isNavy || test.ink === 'navy' ? NAVY_INK : GREEN_INK;
  const w = box.x1 - box.x0 + 1, h = box.y1 - box.y0 + 1;
  const buf = Buffer.alloc(w * h, 255);
  const d = [255 - ink[0], 255 - ink[1], 255 - ink[2]];
  const dd = d[0] * d[0] + d[1] * d[1] + d[2] * d[2];
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const X = x + box.x0, Y = y + box.y0;
    if (test.region && !test.region(X, Y)) continue;
    const i = (Y * W + X) * 3;
    const v = [255 - data[i], 255 - data[i + 1], 255 - data[i + 2]];
    let t = (v[0] * d[0] + v[1] * d[1] + v[2] * d[2]) / dd;
    t = Math.max(0, Math.min(1, t));
    const px = v[0] - t * d[0], py = v[1] - t * d[1], pz = v[2] - t * d[2];
    const perp = Math.sqrt(px * px + py * py + pz * pz);
    if (perp > 55) continue;
    buf[y * w + x] = Math.round(255 * (1 - t));
  }
  return { buf, w, h };
}

async function trace(test, box, fill) {
  const { buf, w, h } = maskImage(test, box);
  const png = await sharp(buf, { raw: { width: w, height: h, channels: 1 } })
    .resize(w * SCALE, h * SCALE, { kernel: 'lanczos3' })
    .blur(2.2)
    .png()
    .toBuffer();
  const tracer = new potrace.Potrace({ threshold: 128, turdSize: 400, optTolerance: 0.4, alphaMax: 1.0 });
  await new Promise((res, rej) => tracer.loadImage(png, (err) => (err ? rej(err) : res())));
  const tag = tracer.getPathTag(fill);
  return tag;
}

const NAVY_INK = sampleInk(isNavy);
const GREEN_INK = sampleInk(isGreen);
const all = bbox((r, g, b) => isNavy(r, g, b) || isGreen(r, g, b));
const box = { x0: all.x0 - 2, y0: all.y0 - 2, x1: all.x1 + 2, y1: all.y1 + 2 };
const bw = (box.x1 - box.x0 + 1) * SCALE, bh = (box.y1 - box.y0 + 1) * SCALE;

// Separate the green bridge-M from the green FOODS line by the gap between them.
const greenRows = [];
for (let y = box.y0; y <= box.y1; y++) {
  let n = 0;
  for (let x = box.x0; x <= box.x1; x++) { const i = (y * W + x) * 3; if (isGreen(data[i], data[i + 1], data[i + 2])) n++; }
  greenRows.push(n);
}
let gapStart = -1;
for (let y = Math.floor(greenRows.length * 0.5); y < greenRows.length; y++) {
  if (greenRows[y] === 0) { gapStart = y + box.y0; break; }
}
const mSplit = gapStart;
const isGreenM = (r, g, b, x, y) => isGreen(r, g, b) && y < mSplit;
isGreenM.ink = 'green';
isGreenM.region = (x, y) => y < mSplit;

const navyPath = await trace(isNavy, box, NAVY);
const greenPath = await trace(isGreen, box, GREEN);
const navyWhite = navyPath.replace(`fill="${NAVY}"`, `fill="${WHITE}"`);

const svg = (paths, title) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${bw} ${bh}" role="img" aria-labelledby="t"><title id="t">${title}</title>${paths}</svg>\n`;

await mkdir(OUT, { recursive: true });
await writeFile(path.join(OUT, 'logo-primary.svg'), svg(navyPath + greenPath, 'Lamza Foods'));
await writeFile(path.join(OUT, 'logo-dark.svg'), svg(navyWhite + greenPath, 'Lamza Foods'));

// Icon: the bridge-shaped M only.
const mb = bbox((r, g, b, x, y) => isGreenM(r, g, b, x, y));
const mbox = { x0: mb.x0 - 2, y0: mb.y0 - 2, x1: mb.x1 + 2, y1: mb.y1 + 2 };
const iconPath = await trace(isGreenM, mbox, GREEN);
const iw = (mbox.x1 - mbox.x0 + 1) * SCALE, ih = (mbox.y1 - mbox.y0 + 1) * SCALE;
const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${iw} ${ih}" role="img" aria-labelledby="t"><title id="t">Lamza Foods</title>${iconPath}</svg>\n`;
await writeFile(path.join(OUT, 'brand-icon.svg'), iconSvg);

// Square favicon: icon centred on white with clear space.
const side = Math.round(Math.max(iw, ih) * 1.25);
const ox = Math.round((side - iw) / 2), oy = Math.round((side - ih) / 2);
const iconInner = iconPath;
const squareSvg = (bg) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${side} ${side}">${bg ? `<rect width="${side}" height="${side}" rx="${Math.round(side * 0.18)}" fill="${bg}"/>` : ''}<g transform="translate(${ox} ${oy})">${iconInner}</g></svg>\n`;
await writeFile(path.join(OUT, 'favicon.svg'), squareSvg(null));
await writeFile(path.join(APP, 'icon.svg'), squareSvg(null));

// Raster exports
const png = (svgStr, width, file, bg) =>
  sharp(Buffer.from(svgStr)).resize({ width }).flatten(bg ? { background: bg } : false).png().toFile(path.join(OUT, file));
await png(svg(navyPath + greenPath, 'Lamza Foods'), 1200, 'logo-primary.png');
await png(svg(navyWhite + greenPath, 'Lamza Foods'), 1200, 'logo-dark.png');
await png(iconSvg, 512, 'brand-icon.png');
await sharp(Buffer.from(squareSvg('#FFFFFF'))).resize(180, 180).png().toFile(path.join(OUT, 'apple-touch-icon.png'));
await sharp(Buffer.from(squareSvg('#FFFFFF'))).resize(180, 180).png().toFile(path.join(APP, 'apple-icon.png'));

// favicon.ico (PNG-in-ICO, 32px and 48px)
const sizes = [16, 32, 48];
const pngs = await Promise.all(sizes.map((s) => sharp(Buffer.from(squareSvg(null))).resize(s, s).png().toBuffer()));
const header = Buffer.alloc(6); header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(sizes.length, 4);
let offset = 6 + 16 * sizes.length;
const entries = pngs.map((p, i) => {
  const e = Buffer.alloc(16);
  e.writeUInt8(sizes[i], 0); e.writeUInt8(sizes[i], 1); e.writeUInt8(0, 2); e.writeUInt8(0, 3);
  e.writeUInt16LE(1, 4); e.writeUInt16LE(32, 6); e.writeUInt32LE(p.length, 8); e.writeUInt32LE(offset, 12);
  offset += p.length; return e;
});
const ico = Buffer.concat([header, ...entries, ...pngs]);
await writeFile(path.join(OUT, 'favicon.ico'), ico);
await writeFile(path.join(APP, 'favicon.ico'), ico);

// Brand pattern tile: bridge-M marks in a half-drop repeat with small geometric accents,
// following the pattern shown in the brand guide.
const t = 96; // tile size
const mW = 30, mH = Math.round(30 * ih / iw);
const mark = (x, y) => `<svg x="${x}" y="${y}" width="${mW}" height="${mH}" viewBox="0 0 ${iw} ${ih}">${iconPath}</svg>`;
const diamond = (x, y, s) => `<path d="M${x} ${y - s}L${x + s * 0.6} ${y}L${x} ${y + s}L${x - s * 0.6} ${y}Z" fill="${GREEN}"/>`;
const tri = (x, y, s) => `<path d="M${x} ${y - s}L${x + s} ${y + s}L${x - s} ${y + s}Z" fill="none" stroke="${GREEN}" stroke-width="1.2"/>`;
const chev = (x, y, s) => `<path d="M${x - s} ${y - s / 2}L${x} ${y + s / 2}L${x + s} ${y - s / 2}" fill="none" stroke="${GREEN}" stroke-width="1.2"/>`;
const bars = (x, y) => `<path d="M${x} ${y - 4}V${y + 4}M${x + 3} ${y - 4}V${y + 4}" stroke="${GREEN}" stroke-width="1"/>`;
const patternSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${t}" height="${t}" viewBox="0 0 ${t} ${t}">` +
  mark(4, 8) + mark(52, 56) + chev(44, 14, 3.5) + diamond(41, 30, 4) + tri(70, 18, 3.5) + diamond(90, 14, 3.5) +
  bars(20, 40) + diamond(8, 62, 3.5) + chev(28, 66, 3.5) + tri(40, 82, 3.5) + bars(86, 40) + diamond(92, 86, 3.5) +
  `</svg>\n`;
await writeFile(path.join(OUT, 'brand-pattern.svg'), patternSvg);

console.log('brand assets written', { logo: [bw, bh], icon: [iw, ih], mSplit });
