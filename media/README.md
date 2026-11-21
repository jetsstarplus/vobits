# Vobits brand kit

Everything here is generated from code: the mark geometry, colours and Geist wordmark live in
[`scripts/brand-core.mjs`](scripts/brand-core.mjs). To regenerate after a change, run:

```bash
npm run brand
```

That rebuilds every SVG/PNG in this folder **and** the website icons (`app/favicon.ico`,
`app/icon.svg`, `app/apple-icon.png`, `public/og-image.png`, `public/brand/*`).
The letterhead PDFs are exported from Word separately (open the `.docx` → *Save as PDF*).

> This folder is **not** served by the website. Keep it that way — the stamp files in particular
> should stay internal.

## The mark

Two arms form a **V / Y**; two square "bits" fall out of it — scattered parts becoming one
system. The redraw keeps the original structure but puts it on a precise grid: every gap between
shapes is the same width, and the arms' angles are parallel.

## Colours

| Name | Hex | Use |
|---|---|---|
| Vobits Blue | `#1E6FD9` | Primary brand colour, links, accents on light backgrounds |
| Blue (on dark) | `#4C93FF` | Blue elements on navy/black backgrounds |
| Ink Navy | `#0E1A2B` | Wordmark, headings, dark backgrounds |
| Signal Lime | `#C8FF4D` | Digital accent (website, social). Use sparingly, never for body text on white |
| Night | `#07080A` | Website background |
| Stamp Red / Stamp Blue | `#B3202A` / `#1D3C8F` | Official stamps only |

Typeface: **Geist** (SemiBold for the wordmark and headings, Regular/Medium for text). For Word
documents use **Arial** so files look the same on every computer.

## Logo variants — `logo/`

| Variant | When to use |
|---|---|
| `primary` | Default. Blue + navy on white or light backgrounds |
| `reversed` | On navy or dark photography |
| `signal` | On the black website / social backgrounds (lime + white) |
| `mono-black` / `mono-white` | Single-colour printing, engraving, faxes, embossing |

Each comes as **horizontal** (default), **stacked** (square spaces) and **mark** (icon only), in
SVG (use this whenever possible) and PNG at two sizes. `logo-on-*.png` have solid backgrounds for
tools that don't handle transparency.

**Clear space:** keep at least the height of one "bit" square free around the logo.
**Minimum size:** horizontal logo 24 mm / 100 px wide; mark 6 mm / 16 px.
**Don't:** stretch, rotate, recolour outside the palette, add shadows, or put the primary logo on
busy photos.

## Icons — `icons/`

`favicon.ico` (16/32/48), `vobits-icon.svg`, 192/512 PNGs, `apple-touch-icon-180.png` and a
maskable 512 for Android. Already wired into the website.

## Social — `social/`

| File | Size | Where |
|---|---|---|
| `og-image-1200x630.png` | 1200×630 | Link previews (WhatsApp, LinkedIn, X, Slack) — live on the site |
| `linkedin-banner-1584x396.png` | 1584×396 | LinkedIn company page cover |
| `x-header-1500x500.png` | 1500×500 | X / Twitter header |
| `profile-avatar-800.png` | 800×800 | Profile picture (navy) |
| `profile-avatar-night-800.png` | 800×800 | Profile picture (black + lime) |

## Stationery — `stationery/`

- `letterhead/Vobits-Letterhead.docx` — blank A4 letterhead; type straight onto it.
- `letterhead/Vobits-Letter-Template.docx` — formal letter layout (ref, date, recipient, RE:,
  sign-off, signature line). Replace the `[bracketed]` text.
- `letterhead/*.pdf` — previews / print-ready versions.
- `business-card/` — 85×55 mm cards with 3 mm bleed at 300 dpi. The back is a template
  ("Your Name", "Job Title") — edit the SVG in Figma/Illustrator/Inkscape per person.
- `email-signature.html` — open in a browser, edit, copy, paste into Outlook/Gmail.

## Stamps — `stamp/`

- `vobits-official-stamp-{red,blue}.svg/png` — the official round company stamp, redrawn as vector.
  `-inked.png` versions have a realistic ink texture.
- **`dated-stamp-generator.html`** — open it in any browser (works offline). Pick the date, an
  optional label (Received, Approved, Paid, Verified, Certified true copy, or custom), the ink colour
  and texture, then download a transparent PNG/SVG or print it.
- `examples/` — sample dated stamps.

⚠️ A digital stamp carries the company's authority. Keep these files on internal drives only,
limit who can use the generator, and never upload them to the public website or shared folders.

## Microsoft Partner

The materials say "Microsoft Partner" as text only. If you want to show the official Microsoft
Partner badge, download it from **Microsoft Partner Center** and follow Microsoft's brand usage
guidelines — don't recreate it or use the Microsoft logo yourself.
