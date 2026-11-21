/**
 * Vobits brand core — single source of truth for the mark geometry,
 * colours and outlined wordmark. Everything in /media is generated from here.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import opentype from "opentype.js";

const here = path.dirname(fileURLToPath(import.meta.url));
export const ROOT = path.resolve(here, "..", "..");
export const MEDIA = path.join(ROOT, "media");

const fontDir = path.join(ROOT, "node_modules", "geist", "dist", "fonts", "geist-sans");
const loadFont = (file) => {
  const buf = fs.readFileSync(path.join(fontDir, file));
  return opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));
};
export const FONTS = {
  regular: loadFont("Geist-Regular.ttf"),
  medium: loadFont("Geist-Medium.ttf"),
  semibold: loadFont("Geist-SemiBold.ttf"),
  bold: loadFont("Geist-Bold.ttf"),
};
export const FONT_FILES = { semibold: path.join(fontDir, "Geist-SemiBold.woff2"), bold: path.join(fontDir, "Geist-Bold.woff2") };

/* ── Colour system ─────────────────────────────────────────── */
export const COLORS = {
  blue: "#1E6FD9", // Vobits Blue — primary brand colour
  blueBright: "#4C93FF", // Blue for dark backgrounds
  navy: "#0E1A2B", // Ink Navy — secondary / text
  lime: "#C8FF4D", // Signal Lime — digital accent
  night: "#07080A", // Website background
  paper: "#FFFFFF",
  stampRed: "#B3202A",
  stampBlue: "#1D3C8F",
};

/* ── Mark geometry (viewBox 0 0 100 84) ────────────────────────
   Two arms form the V/Y; two "bits" fall out of it.
   Every gap between shapes is a constant 6 units. */
export const MARK = {
  w: 100,
  h: 84,
  armA: "M0 0H32L52 32H20Z",
  armB: "M68 0H100L66 54L52 32Z",
  bitA: "M18 38H46V66H18Z",
  bitB: "M54 60H78V84H54Z",
};

/** Colour schemes: [armA, armB, bitA, bitB] */
export const SCHEMES = {
  primary: [COLORS.blue, COLORS.navy, COLORS.navy, COLORS.blue],
  reversed: [COLORS.blueBright, COLORS.paper, COLORS.paper, COLORS.blueBright],
  signal: [COLORS.lime, COLORS.paper, COLORS.paper, COLORS.lime],
  "mono-black": Array(4).fill(COLORS.navy),
  "mono-white": Array(4).fill(COLORS.paper),
};
export const WORD_COLOR = {
  primary: COLORS.navy,
  reversed: COLORS.paper,
  signal: COLORS.paper,
  "mono-black": COLORS.navy,
  "mono-white": COLORS.paper,
};

export function markPaths(scheme, { x = 0, y = 0, scale = 1 } = {}) {
  const [a, b, c, d] = SCHEMES[scheme] ?? scheme;
  return `<g transform="translate(${x} ${y}) scale(${scale})">
  <path d="${MARK.armA}" fill="${a}"/>
  <path d="${MARK.armB}" fill="${b}"/>
  <path d="${MARK.bitA}" fill="${c}"/>
  <path d="${MARK.bitB}" fill="${d}"/>
</g>`;
}

const f2 = (n) => (Math.round(n * 100) / 100).toString();

/** Glyph outline commands at the origin (baseline y = 0, y grows downward). */
export function glyphCommands(glyph, size) {
  return glyph.getPath(0, 0, size).commands.filter((c) =>
    [c.x, c.y, c.x1, c.y1, c.x2, c.y2].every((v) => v === undefined || Number.isFinite(v))
  );
}

/** Serialise path commands with an (dx, dy) offset. */
export function commandsToD(cmds, dx = 0, dy = 0) {
  let d = "";
  for (const c of cmds) {
    if (c.type === "M" || c.type === "L") d += `${c.type}${f2(c.x + dx)} ${f2(c.y + dy)}`;
    else if (c.type === "Q") d += `Q${f2(c.x1 + dx)} ${f2(c.y1 + dy)} ${f2(c.x + dx)} ${f2(c.y + dy)}`;
    else if (c.type === "C")
      d += `C${f2(c.x1 + dx)} ${f2(c.y1 + dy)} ${f2(c.x2 + dx)} ${f2(c.y2 + dy)} ${f2(c.x + dx)} ${f2(c.y + dy)}`;
    else if (c.type === "Z") d += "Z";
  }
  return d;
}

/** Outline text with Geist → { d, x1, y1, x2, y2, width } (baseline at y). */
export function textPath(text, { font = FONTS.semibold, size = 100, x = 0, y = 0, tracking = 0 } = {}) {
  // Manual layout: opentype.js 2.0's `letterSpacing` option emits NaN coordinates.
  const glyphs = font.stringToGlyphs(text);
  const scale = size / font.unitsPerEm;
  let cx = x;
  let d = "";
  let x1 = Infinity, y1 = Infinity, x2 = -Infinity, y2 = -Infinity;
  glyphs.forEach((g, i) => {
    // Outline at the origin and offset ourselves — opentype.js 2.0 can emit NaN
    // for some glyphs (e.g. Geist "w") when asked to place them at an x offset.
    const cmds = glyphCommands(g, size);
    if (cmds.length) {
      for (const c of cmds) {
        for (const [px, py] of [[c.x, c.y], [c.x1, c.y1], [c.x2, c.y2]]) {
          if (px === undefined) continue;
          x1 = Math.min(x1, px + cx); x2 = Math.max(x2, px + cx);
          y1 = Math.min(y1, py + y); y2 = Math.max(y2, py + y);
        }
      }
      d += commandsToD(cmds, cx, y);
    }
    let adv = g.advanceWidth * scale;
    if (i < glyphs.length - 1) adv += font.getKerningValue(g, glyphs[i + 1]) * scale;
    cx += adv + tracking * size;
  });
  if (x1 === Infinity) x1 = y1 = x2 = y2 = 0;
  return { d, x1, y1, x2, y2, width: x2 - x1 };
}

export const capHeight = (font) => font.tables.os2.sCapHeight / font.unitsPerEm;

/* ── Lockups ───────────────────────────────────────────────── */
const svgDoc = (w, h, body, bg) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${round(w)} ${round(h)}" width="${round(w)}" height="${round(h)}">${
    bg ? `<rect width="100%" height="100%" fill="${bg}"/>` : ""
  }${body}</svg>\n`;
const round = (n) => Math.round(n * 100) / 100;

/** Horizontal lockup: mark + wordmark. Cap height of "V" = 76% of mark height. */
export function logoHorizontal(scheme, { pad = 0, bg } = {}) {
  const font = FONTS.semibold;
  const markH = MARK.h;
  const cap = markH * 0.76;
  const size = cap / capHeight(font);
  const gap = 24;
  const baseline = (markH + cap) / 2 + 4; // optically centred, nudged toward the bits
  const word = textPath("Vobits", { font, size, x: 0, y: baseline, tracking: -0.025 });
  const wx = MARK.w + gap - word.x1;
  const width = MARK.w + gap + word.width;
  const top = Math.min(0, word.y1);
  const bottom = Math.max(markH, word.y2);
  const h = bottom - top;
  const body = `<g transform="translate(${pad} ${pad - top})">${markPaths(scheme)}<path transform="translate(${round(wx)} 0)" d="${word.d}" fill="${WORD_COLOR[scheme]}"/></g>`;
  return svgDoc(width + pad * 2, h + pad * 2, body, bg);
}

/** Stacked lockup: mark centred above wordmark. */
export function logoStacked(scheme, { pad = 0, bg } = {}) {
  const font = FONTS.semibold;
  const size = 62;
  const word = textPath("Vobits", { font, size, x: 0, y: 0, tracking: -0.025 });
  const width = Math.max(MARK.w, word.width);
  const gap = 22;
  const wordTop = MARK.h + gap;
  const h = wordTop + (word.y2 - word.y1);
  const body = `<g transform="translate(${pad} ${pad})">${markPaths(scheme, { x: (width - MARK.w) / 2 })}<path transform="translate(${round((width - word.width) / 2 - word.x1)} ${round(wordTop - word.y1)})" d="${word.d}" fill="${WORD_COLOR[scheme]}"/></g>`;
  return svgDoc(width + pad * 2, h + pad * 2, body, bg);
}

/** Mark only. */
export function logoMark(scheme, { pad = 0, bg } = {}) {
  return svgDoc(MARK.w + pad * 2, MARK.h + pad * 2, markPaths(scheme, { x: pad, y: pad }), bg);
}

/** App icon: mark on a rounded navy tile (or full-bleed when `rounded` false). */
export function appIcon({ size = 512, rounded = true, scheme = "reversed", bg = COLORS.navy, inset = 0.2 } = {}) {
  const r = rounded ? size * 0.22 : 0;
  const inner = size * (1 - inset * 2);
  const scale = inner / MARK.w;
  const x = (size - MARK.w * scale) / 2;
  const y = (size - MARK.h * scale) / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${r}" fill="${bg}"/>${markPaths(scheme, { x, y, scale })}</svg>\n`;
}

export function write(rel, content) {
  const file = path.join(MEDIA, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
  return file;
}
