/**
 * Generates every Vobits brand asset into /media (and the web icons into /app + /public).
 * Run:  npm run brand
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import {
  COLORS,
  FONTS,
  FONT_FILES,
  MARK,
  MEDIA,
  ROOT,
  SCHEMES,
  appIcon,
  capHeight,
  commandsToD,
  glyphCommands,
  logoHorizontal,
  logoMark,
  logoStacked,
  markPaths,
  textPath,
  write,
} from "./brand-core.mjs";

const png = async (svg, file, width, opts = {}) => {
  const out = path.isAbsolute(file) ? file : path.join(MEDIA, file);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  await sharp(Buffer.from(svg), { density: opts.density ?? 300 })
    .resize(opts.height ? { width, height: opts.height, fit: "fill" } : { width })
    .png({ compressionLevel: 9 })
    .toFile(out);
  return out;
};

/* ───────────────────────── 1. Logos ───────────────────────── */
const schemes = Object.keys(SCHEMES);
const lockups = { horizontal: logoHorizontal, stacked: logoStacked, mark: logoMark };

for (const [name, fn] of Object.entries(lockups)) {
  for (const s of schemes) {
    const base = `vobits-${name === "mark" ? "mark" : `logo-${name}`}-${s}`;
    const svg = fn(s);
    write(`logo/svg/${base}.svg`, svg);
    const widths = name === "horizontal" ? [600, 2000] : [512, 2000];
    for (const w of widths) await png(svg, `logo/png/${base}-${w}w.png`, w);
  }
}
// Logos on solid backgrounds (handy for presentations / docs that don't support transparency)
await png(logoHorizontal("primary", { pad: 60, bg: COLORS.paper }), "logo/png/vobits-logo-on-white.png", 2000);
await png(logoHorizontal("reversed", { pad: 60, bg: COLORS.navy }), "logo/png/vobits-logo-on-navy.png", 2000);
await png(logoHorizontal("signal", { pad: 60, bg: COLORS.night }), "logo/png/vobits-logo-on-night.png", 2000);

/* ───────────────────────── 2. Icons + favicon ───────────────────────── */
function ico(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  const dir = Buffer.alloc(16 * images.length);
  let offset = 6 + 16 * images.length;
  images.forEach((im, i) => {
    const o = i * 16;
    dir.writeUInt8(im.size >= 256 ? 0 : im.size, o);
    dir.writeUInt8(im.size >= 256 ? 0 : im.size, o + 1);
    dir.writeUInt16LE(1, o + 4);
    dir.writeUInt16LE(32, o + 6);
    dir.writeUInt32LE(im.buf.length, o + 8);
    dir.writeUInt32LE(offset, o + 12);
    offset += im.buf.length;
  });
  return Buffer.concat([header, dir, ...images.map((i) => i.buf)]);
}

const iconSvg = appIcon({ size: 512 });
const tinySvg = appIcon({ size: 512, inset: 0.14, rounded: true }); // bigger mark for 16–48px
write("icons/vobits-icon.svg", iconSvg);
const icoImages = [];
for (const size of [16, 32, 48]) {
  icoImages.push({ size, buf: await sharp(Buffer.from(tinySvg)).resize(size).png().toBuffer() });
}
const favicon = ico(icoImages);
write("icons/favicon.ico", favicon);
for (const size of [192, 512]) await png(iconSvg, `icons/vobits-icon-${size}.png`, size);
const fullBleed = appIcon({ size: 512, rounded: false, inset: 0.22 });
await png(fullBleed, "icons/apple-touch-icon-180.png", 180);
await png(appIcon({ size: 512, rounded: false, inset: 0.28 }), "icons/vobits-icon-maskable-512.png", 512);

// Wire into the website (Next.js file conventions)
fs.writeFileSync(path.join(ROOT, "app", "favicon.ico"), favicon);
fs.writeFileSync(path.join(ROOT, "app", "icon.svg"), iconSvg);
await png(fullBleed, path.join(ROOT, "app", "apple-icon.png"), 180);
fs.mkdirSync(path.join(ROOT, "public", "brand"), { recursive: true });
fs.writeFileSync(path.join(ROOT, "public", "brand", "vobits-logo-reversed.svg"), logoHorizontal("reversed"));
fs.writeFileSync(path.join(ROOT, "public", "brand", "vobits-logo-primary.svg"), logoHorizontal("primary"));
await png(logoHorizontal("primary"), path.join(ROOT, "public", "brand", "vobits-logo-primary.png"), 600);
await png(logoHorizontal("primary"), path.join(ROOT, "public", "brand", "vobits-logo-email.png"), 360);
await png(iconSvg, path.join(ROOT, "public", "brand", "vobits-icon-512.png"), 512);

/* ───────────────────────── 3. Social ───────────────────────── */
function mulberry32(seed) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
/** Dotted sphere — echoes the 3D hero on the website. */
function dotSphere(cx, cy, R, count = 1400) {
  const rand = mulberry32(7);
  const golden = Math.PI * (3 - Math.sqrt(5));
  const tilt = 0.35;
  let out = "";
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const t = golden * i;
    let x = Math.cos(t) * r, z = Math.sin(t) * r, yy = y;
    const y2 = yy * Math.cos(tilt) - z * Math.sin(tilt);
    const z2 = yy * Math.sin(tilt) + z * Math.cos(tilt);
    const depth = (z2 + 1) / 2; // 0 back .. 1 front
    const wave = Math.sin(x * 3) * Math.cos(y2 * 3) * Math.sin(z2 * 3);
    const lime = wave * 0.8 + rand() * 0.35 > 0.25;
    const size = (0.6 + rand()) * (0.9 + depth * 1.4);
    const a = 0.15 + depth * 0.8;
    out += `<circle cx="${(cx + x * R).toFixed(1)}" cy="${(cy + y2 * R).toFixed(1)}" r="${size.toFixed(2)}" fill="${lime ? COLORS.lime : "#8a9099"}" fill-opacity="${a.toFixed(2)}"/>`;
  }
  return out;
}

function textLine(text, { x, y, size, font = FONTS.semibold, fill = "#fff", tracking = -0.03, anchor = "start" }) {
  const t = textPath(text, { font, size, x: 0, y: 0, tracking });
  const dx = anchor === "end" ? x - t.x2 : anchor === "middle" ? x - (t.x1 + t.x2) / 2 : x - t.x1;
  return `<path transform="translate(${dx.toFixed(2)} ${y})" d="${t.d}" fill="${fill}"/>`;
}

const glow = (id, cx, cy, r) =>
  `<defs><radialGradient id="${id}" cx="${cx}" cy="${cy}" r="${r}" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="${COLORS.lime}" stop-opacity="0.14"/><stop offset="1" stop-color="${COLORS.lime}" stop-opacity="0"/></radialGradient></defs>`;

function logoInline(scheme, x, y, h) {
  // Horizontal lockup scaled to height h
  const svg = logoHorizontal(scheme);
  const [, w0, h0] = svg.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/);
  const s = h / +h0;
  const inner = svg.replace(/^<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "");
  return { svg: `<g transform="translate(${x} ${y}) scale(${s.toFixed(4)})">${inner}</g>`, width: +w0 * s };
}

{
  const W = 1200, H = 630;
  const logo = logoInline("signal", 80, 72, 40);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
${glow("g", 880, 320, 420)}<rect width="${W}" height="${H}" fill="${COLORS.night}"/><rect width="${W}" height="${H}" fill="url(#g)"/>
${dotSphere(900, 320, 230)}
${logo.svg}
${textLine("Software that", { x: 80, y: 290, size: 76 })}
${textLine("moves your", { x: 80, y: 375, size: 76 })}
${textLine("business forward.", { x: 80, y: 460, size: 76, fill: COLORS.lime })}
${textLine("MICROSOFT PARTNER  ·  BESPOKE SOFTWARE  ·  BUSINESS CENTRAL  ·  HR & PAYROLL", { x: 80, y: 560, size: 15, font: FONTS.medium, fill: "#8b9098", tracking: 0.12 })}
${textLine("vobits.ke", { x: W - 80, y: 560, size: 18, font: FONTS.medium, fill: "#ffffff", anchor: "end", tracking: 0 })}
</svg>`;
  write("social/og-image.svg", svg);
  await png(svg, "social/og-image-1200x630.png", W, { density: 144 });
  await png(svg, path.join(ROOT, "public", "og-image.png"), W, { density: 144 });
}

{
  // LinkedIn company banner — content kept right of the avatar overlap zone
  const W = 1584, H = 396;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
${glow("g", 1290, 200, 380)}<rect width="${W}" height="${H}" fill="${COLORS.night}"/><rect width="${W}" height="${H}" fill="url(#g)"/>
${dotSphere(1290, 200, 160, 1100)}
${textLine("Software that moves your", { x: 480, y: 170, size: 54 })}
${textLine("business forward.", { x: 480, y: 235, size: 54, fill: COLORS.lime })}
${textLine("MICROSOFT PARTNER  ·  NGOs  ·  PROFESSIONAL BODIES  ·  GOVERNMENT  ·  PRIVATE SECTOR", { x: 480, y: 300, size: 12, font: FONTS.medium, fill: "#8b9098", tracking: 0.12 })}
</svg>`;
  await png(svg, "social/linkedin-banner-1584x396.png", W, { density: 144 });
}
{
  const W = 1500, H = 500;
  const logo = logoInline("signal", 80, 80, 36);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
${glow("g", 1150, 250, 400)}<rect width="${W}" height="${H}" fill="${COLORS.night}"/><rect width="${W}" height="${H}" fill="url(#g)"/>
${dotSphere(1150, 250, 190, 1200)}
${logo.svg}
${textLine("Software that moves your", { x: 80, y: 290, size: 56 })}
${textLine("business forward.", { x: 80, y: 358, size: 56, fill: COLORS.lime })}
</svg>`;
  await png(svg, "social/x-header-1500x500.png", W, { density: 144 });
}
await png(appIcon({ size: 800, rounded: false, inset: 0.24 }), "social/profile-avatar-800.png", 800);
await png(
  appIcon({ size: 800, rounded: false, inset: 0.24, scheme: "signal", bg: COLORS.night }),
  "social/profile-avatar-night-800.png",
  800
);

/* ───────────────────────── 4. Stamps ───────────────────────── */
function arcText(text, { font = FONTS.bold, size, r, cx = 200, cy = 200, top = true, tracking = 0 }) {
  const glyphs = font.stringToGlyphs(text);
  const scale = size / font.unitsPerEm;
  const advs = glyphs.map((g) => g.advanceWidth * scale);
  const total = advs.reduce((a, b) => a + b, 0) + tracking * size * (glyphs.length - 1);
  let cum = 0;
  let out = "";
  glyphs.forEach((g, i) => {
    const adv = advs[i];
    const mid = cum + adv / 2;
    const theta = top
      ? -Math.PI / 2 - total / (2 * r) + mid / r
      : Math.PI / 2 + total / (2 * r) - mid / r;
    const px = cx + r * Math.cos(theta);
    const py = cy + r * Math.sin(theta);
    const rot = (theta * 180) / Math.PI + (top ? 90 : -90);
    const d = commandsToD(glyphCommands(g, size), -adv / 2, 0);
    if (d) out += `<path transform="translate(${px.toFixed(2)} ${py.toFixed(2)}) rotate(${rot.toFixed(2)})" d="${d}"/>`;
    cum += adv + tracking * size;
  });
  return out;
}
function star(x, y, R, r = R * 0.45) {
  let d = "";
  for (let i = 0; i < 10; i++) {
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    const rad = i % 2 ? r : R;
    d += `${i ? "L" : "M"}${(x + rad * Math.cos(a)).toFixed(2)} ${(y + rad * Math.sin(a)).toFixed(2)}`;
  }
  return `<path d="${d}Z"/>`;
}
const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
export const formatStampDate = (d) =>
  `${String(d.getDate()).padStart(2, "0")} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;

const INK_FILTER = `<filter id="ink" filterUnits="userSpaceOnUse" x="0" y="0" width="400" height="400"><feTurbulence type="fractalNoise" baseFrequency="0.55" numOctaves="3" seed="9" result="n"/><feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -9 5.6" result="m"/><feComposite in="SourceGraphic" in2="m" operator="in"/></filter>`;

/** Static ring of the stamp (rings + arc text + separators). */
function stampRing() {
  return [
    `<circle cx="200" cy="200" r="191" fill="none" stroke="currentColor" stroke-width="7"/>`,
    `<circle cx="200" cy="200" r="180" fill="none" stroke="currentColor" stroke-width="2"/>`,
    `<circle cx="200" cy="200" r="127" fill="none" stroke="currentColor" stroke-width="2"/>`,
    `<circle cx="200" cy="200" r="119" fill="none" stroke="currentColor" stroke-width="5"/>`,
    arcText("VOBITS LIMITED", { size: 34, r: 141, top: true, tracking: 0.1 }),
    arcText("P.O. BOX 54229 – 00200 · NAIROBI", { size: 19, r: 161, top: false, tracking: 0.12, font: FONTS.semibold }),
    star(46, 200, 9),
    star(354, 200, 9),
  ].join("");
}

function stampSvg({ ink = COLORS.stampRed, date = null, label = "", texture = false } = {}) {
  let center;
  if (!date) {
    const s = 1.3;
    center = `<g fill="currentColor">${markPaths(Array(4).fill("currentColor"), { x: 200 - (MARK.w * s) / 2, y: 200 - (MARK.h * s) / 2, scale: s })}</g>`;
  } else {
    const s = 0.52;
    const chord = (y) => Math.sqrt(119 ** 2 - (y - 200) ** 2) - 8;
    const line = (y) => `<line x1="${200 - chord(y)}" y1="${y}" x2="${200 + chord(y)}" y2="${y}" stroke="currentColor" stroke-width="3"/>`;
    center = [
      markPaths(Array(4).fill("currentColor"), { x: 200 - (MARK.w * s) / 2, y: 122, scale: s }),
      line(180),
      line(236),
      `<g fill="currentColor">${textLine(formatStampDate(date), { x: 200, y: 221, size: 33, font: FONTS.bold, anchor: "middle", tracking: 0.04, fill: "currentColor" })}</g>`,
      label
        ? `<g fill="currentColor">${textLine(label.toUpperCase(), { x: 200, y: 270, size: 16, font: FONTS.bold, anchor: "middle", tracking: 0.22, fill: "currentColor" })}</g>`
        : `<g fill="currentColor">${textLine("NAIROBI · KENYA", { x: 200, y: 268, size: 13, font: FONTS.semibold, anchor: "middle", tracking: 0.25, fill: "currentColor" })}</g>`,
    ].join("");
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400" color="${ink}">${
    texture ? `<defs>${INK_FILTER}</defs>` : ""
  }<g fill="currentColor"${texture ? ' filter="url(#ink)"' : ""}>${stampRing()}${center}</g></svg>\n`;
}

const today = new Date();
for (const [name, ink] of [["red", COLORS.stampRed], ["blue", COLORS.stampBlue]]) {
  const svg = stampSvg({ ink });
  write(`stamp/vobits-official-stamp-${name}.svg`, svg);
  await png(svg, `stamp/vobits-official-stamp-${name}.png`, 1200);
  await png(stampSvg({ ink, texture: true }), `stamp/vobits-official-stamp-${name}-inked.png`, 1200);
}
const dated = stampSvg({ ink: COLORS.stampBlue, date: today, label: "Received" });
write("stamp/examples/vobits-dated-stamp-example.svg", dated);
await png(dated, "stamp/examples/vobits-dated-stamp-example.png", 1200);
await png(stampSvg({ ink: COLORS.stampRed, date: today, texture: true }), "stamp/examples/vobits-dated-stamp-example-inked.png", 1200);

// Self-contained dated stamp generator (offline HTML — open in a browser)
{
  const fontB64 = fs.readFileSync(FONT_FILES.bold).toString("base64");
  const ring = stampRing();
  const markD = markPaths(Array(4).fill("currentColor"), { x: 200 - (MARK.w * 0.52) / 2, y: 122, scale: 0.52 });
  const tpl = fs.readFileSync(path.join(MEDIA, "scripts", "dated-stamp.template.html"), "utf8");
  write(
    "stamp/dated-stamp-generator.html",
    tpl
      .replace("__FONT__", fontB64)
      .replace("__RING__", ring)
      .replace("__MARK__", markD)
      .replace("__INK_FILTER__", INK_FILTER)
  );
}

/* ───────────────────────── 5. Business cards ───────────────────────── */
{
  // 85 × 55 mm @ 300 dpi with 3 mm bleed → 91 × 61 mm
  const mm = 300 / 25.4;
  const W = Math.round(91 * mm), H = Math.round(61 * mm);
  const bleed = 3 * mm;
  const front = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
${glow("g", W * 0.78, H * 0.5, W * 0.55)}<rect width="${W}" height="${H}" fill="${COLORS.night}"/><rect width="${W}" height="${H}" fill="url(#g)"/>
${dotSphere(W * 0.8, H * 0.5, H * 0.36, 900)}
${logoInline("signal", bleed + 6 * mm, bleed + 6 * mm, 8 * mm).svg}
${textLine("Software that moves your", { x: bleed + 6 * mm, y: H - bleed - 13 * mm, size: 4.2 * mm })}
${textLine("business forward.", { x: bleed + 6 * mm, y: H - bleed - 7.5 * mm, size: 4.2 * mm, fill: COLORS.lime })}
</svg>`;
  const back = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
<rect width="${W}" height="${H}" fill="#ffffff"/>
${logoInline("primary", bleed + 6 * mm, bleed + 6 * mm, 6.5 * mm).svg}
${textLine("Your Name", { x: bleed + 6 * mm, y: bleed + 27 * mm, size: 4.4 * mm, fill: COLORS.navy, tracking: -0.02 })}
${textLine("Job Title", { x: bleed + 6 * mm, y: bleed + 32 * mm, size: 2.7 * mm, font: FONTS.medium, fill: COLORS.blue, tracking: 0 })}
${textLine("hello@vobits.ke", { x: bleed + 6 * mm, y: bleed + 40 * mm, size: 2.5 * mm, font: FONTS.regular, fill: COLORS.navy, tracking: 0 })}
${textLine("vobits.ke", { x: bleed + 6 * mm, y: bleed + 44.2 * mm, size: 2.5 * mm, font: FONTS.regular, fill: COLORS.navy, tracking: 0 })}
${textLine("P.O. Box 54229 – 00200, Nairobi", { x: bleed + 6 * mm, y: bleed + 48.4 * mm, size: 2.5 * mm, font: FONTS.regular, fill: COLORS.navy, tracking: 0 })}
${textLine("MICROSOFT PARTNER", { x: W - bleed - 6 * mm, y: bleed + 48.4 * mm, size: 1.9 * mm, font: FONTS.semibold, fill: "#6b7280", anchor: "end", tracking: 0.14 })}
<rect x="${W - bleed - 6 * mm - 14 * mm}" y="${bleed + 6 * mm}" width="${14 * mm}" height="${1.2 * mm}" fill="${COLORS.blue}"/>
<rect x="${W - bleed - 6 * mm - 4 * mm}" y="${bleed + 6 * mm}" width="${4 * mm}" height="${1.2 * mm}" fill="${COLORS.lime}"/>
</svg>`;
  write("stationery/business-card/business-card-front.svg", front);
  write("stationery/business-card/business-card-back-template.svg", back);
  await png(front, "stationery/business-card/business-card-front-300dpi.png", W, { density: 72 });
  await png(back, "stationery/business-card/business-card-back-template-300dpi.png", W, { density: 72 });
}

/* ───────────────────────── 6. Letterhead header art ───────────────────────── */
await png(logoHorizontal("primary"), "stationery/letterhead/_letterhead-logo.png", 900);
{
  // Thin brand band used in the letterhead footer: blue → navy with a lime "bit"
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1800 12" width="1800" height="12"><rect width="1500" height="12" fill="${COLORS.blue}"/><rect x="1500" width="240" height="12" fill="${COLORS.navy}"/><rect x="1752" width="48" height="12" fill="${COLORS.lime}"/></svg>`;
  await png(svg, "stationery/letterhead/_letterhead-band.png", 1800, { density: 72 });
}

console.log("Brand assets written to", MEDIA);
console.log("Cap-height ratio", capHeight(FONTS.semibold).toFixed(3));
