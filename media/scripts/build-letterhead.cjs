/**
 * Builds the official Vobits letterhead (A4) as editable Word documents:
 *   media/stationery/letterhead/Vobits-Letterhead.docx          — blank, ready to type on
 *   media/stationery/letterhead/Vobits-Letter-Template.docx     — formal letter layout with placeholders
 * Run after build-brand.mjs (it needs the logo + band PNGs).
 */
const fs = require("node:fs");
const path = require("node:path");
const {
  AlignmentType,
  BorderStyle,
  Document,
  Footer,
  Header,
  ImageRun,
  Packer,
  PageNumber,
  Paragraph,
  Table,
  TableCell,
  TableLayoutType,
  TableRow,
  TabStopType,
  TextRun,
  VerticalAlign,
  WidthType,
} = require("docx");

const DIR = path.join(__dirname, "..", "stationery", "letterhead");
const logo = fs.readFileSync(path.join(DIR, "_letterhead-logo.png"));
const band = fs.readFileSync(path.join(DIR, "_letterhead-band.png"));

const NAVY = "0E1A2B";
const BLUE = "1E6FD9";
const GREY = "6B7280";
const FONT = "Arial";

// A4 in DXA, 20 mm side margins
const PAGE = { width: 11906, height: 16838 };
const MARGIN = { top: 2100, bottom: 1700, left: 1134, right: 1134, header: 560, footer: 420 };
const CONTENT = PAGE.width - MARGIN.left - MARGIN.right; // 9638 DXA ≈ 6.69 in
const NONE = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const noBorders = { top: NONE, bottom: NONE, left: NONE, right: NONE, insideHorizontal: NONE, insideVertical: NONE };

const run = (text, o = {}) => new TextRun({ text, font: FONT, size: o.size ?? 16, color: o.color ?? GREY, bold: o.bold, italics: o.italics, characterSpacing: o.spacing });
const p = (children, o = {}) =>
  new Paragraph({ children: Array.isArray(children) ? children : [children], alignment: o.align, spacing: { before: 0, after: o.after ?? 0, line: o.line ?? 240 }, ...o.extra });

function header() {
  const logoW = 170; // px at 96 dpi ≈ 1.77 in
  const logoH = Math.round((logoW * 197) / 900);
  const leftW = 4200;
  const rightW = CONTENT - leftW;
  return new Header({
    children: [
      new Table({
        width: { size: CONTENT, type: WidthType.DXA },
        columnWidths: [leftW, rightW],
        layout: TableLayoutType.FIXED,
        borders: noBorders,
        rows: [
          new TableRow({
            children: [
              new TableCell({
                width: { size: leftW, type: WidthType.DXA },
                borders: noBorders,
                verticalAlign: VerticalAlign.CENTER,
                children: [p(new ImageRun({ type: "png", data: logo, transformation: { width: logoW, height: logoH }, altText: { title: "Vobits", description: "Vobits Limited logo", name: "logo" } }))],
              }),
              new TableCell({
                width: { size: rightW, type: WidthType.DXA },
                borders: noBorders,
                verticalAlign: VerticalAlign.CENTER,
                children: [
                  p(run("VOBITS LIMITED", { bold: true, color: NAVY, size: 17, spacing: 30 }), { align: AlignmentType.RIGHT, after: 40 }),
                  p(run("P.O. Box 54229 – 00200, Nairobi, Kenya"), { align: AlignmentType.RIGHT, after: 20 }),
                  p([run("hello@vobits.ke"), run("   ·   ", { color: BLUE }), run("www.vobits.ke")], { align: AlignmentType.RIGHT }),
                ],
              }),
            ],
          }),
        ],
      }),
      // Brand rule under the header
      p(run(""), {
        after: 0,
        extra: { border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: BLUE, space: 6 } } },
      }),
    ],
  });
}

function footer() {
  const bandW = Math.round((CONTENT / 1440) * 96); // full content width in px
  return new Footer({
    children: [
      p(new ImageRun({ type: "png", data: band, transformation: { width: bandW, height: 4 }, altText: { title: "Brand band", description: "Decorative brand colour band", name: "band" } }), { after: 100 }),
      new Paragraph({
        tabStops: [{ type: TabStopType.RIGHT, position: CONTENT }],
        spacing: { before: 0, after: 0 },
        children: [
          run("Microsoft Partner  ·  Bespoke Software  ·  Dynamics 365 Business Central  ·  HR & Payroll", { size: 14 }),
          new TextRun({ text: "\tPage ", font: FONT, size: 14, color: GREY }),
          new TextRun({ children: [PageNumber.CURRENT], font: FONT, size: 14, color: GREY }),
        ],
      }),
    ],
  });
}

const styles = {
  default: { document: { run: { font: FONT, size: 21, color: "1F2937" }, paragraph: { spacing: { after: 160, line: 288 } } } },
};

const section = (children) => ({
  properties: { page: { size: PAGE, margin: MARGIN } },
  headers: { default: header() },
  footers: { default: footer() },
  children,
});

const body = (text, o = {}) =>
  new Paragraph({ spacing: { after: o.after ?? 160, line: 288 }, alignment: o.align, children: [new TextRun({ text, font: FONT, size: 21, bold: o.bold, underline: o.underline ? {} : undefined, color: o.color ?? "1F2937" })] });

async function main() {
  // 1. Blank letterhead
  const blank = new Document({
    creator: "Vobits Limited",
    title: "Vobits Limited — Letterhead",
    styles,
    sections: [section([body("")])],
  });
  fs.writeFileSync(path.join(DIR, "Vobits-Letterhead.docx"), await Packer.toBuffer(blank));

  // 2. Formal letter template
  const letter = new Document({
    creator: "Vobits Limited",
    title: "Vobits Limited — Letter Template",
    styles,
    sections: [
      section([
        new Paragraph({
          tabStops: [{ type: TabStopType.RIGHT, position: CONTENT }],
          spacing: { after: 320 },
          children: [
            new TextRun({ text: "Our Ref: VBT/[DEPT]/[NO.]/[YEAR]", font: FONT, size: 19, color: GREY }),
            new TextRun({ text: "\t[Day Month Year]", font: FONT, size: 19, color: GREY }),
          ],
        }),
        body("[Recipient Name]", { after: 0, bold: true }),
        body("[Title / Position]", { after: 0 }),
        body("[Organisation]", { after: 0 }),
        body("[P.O. Box / Physical Address]", { after: 0 }),
        body("[Town, Country]", { after: 320 }),
        body("Dear [Salutation],"),
        body("RE: [SUBJECT OF THE LETTER IN CAPITALS]", { bold: true, underline: true, after: 240 }),
        body("[Opening paragraph — state the purpose of the letter in one or two sentences.]"),
        body("[Body — provide the details, context and any figures or dates the recipient needs to act on.]"),
        body("[Closing paragraph — state the next step, deadline or the contact person for follow-up.]", { after: 320 }),
        body("Yours faithfully,", { after: 120 }),
        body("For and on behalf of Vobits Limited", { color: GREY, after: 1100 }),
        new Paragraph({
          spacing: { after: 0 },
          border: { top: { style: BorderStyle.SINGLE, size: 4, color: "9CA3AF", space: 4 } },
          indent: { right: CONTENT - 3600 },
          children: [new TextRun({ text: "[Full Name]", font: FONT, size: 21, bold: true, color: NAVY })],
        }),
        body("[Title]", { color: GREY, after: 0 }),
      ]),
    ],
  });
  fs.writeFileSync(path.join(DIR, "Vobits-Letter-Template.docx"), await Packer.toBuffer(letter));
  console.log("Letterhead written to", DIR);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
