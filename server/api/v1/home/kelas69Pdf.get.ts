import PDFDocument from "pdfkit";
import { sendStream } from "h3";
import type { Readable } from "node:stream";
import { type GenerusCount, getKelas69 } from "~~/server/modules/dashboard";

const MARGIN = 30;
const ROW_HEIGHT = 20;
const COL_WIDTHS = [40, 200, 50, 50, 50, 50, 100];
const START_X = 30;
const FONT_NORMAL = "Helvetica";
const FONT_BOLD = "Helvetica-Bold";

const doc = new PDFDocument({ margin: MARGIN, size: "A4" });
doc.lineWidth(0.25);

let y = 100;

export default defineEventHandler(async (event) => {
  const user = authGuard(event);
  const data = await getKelas69(user.daerahId);

  setHeader(event, "Content-Type", "application/pdf");
  setHeader(event, "Content-Disposition", 'inline; filename="kelas69.pdf"');

  renderHeader();
  doc.fontSize(10);
  renderTableHeader();

  for (const desa of data.desa) {
    const kelompok = data.kelompok.filter((j) => j.desaId === desa.id);
    const ids = new Set(kelompok.map((k) => k.id));
    const filtered = Object.fromEntries(
      Object.entries(data.kelompokCounts).filter(([id]) => ids.has(Number(id)))
    );
    renderTableData(desa, kelompok, filtered);
  }

  renderFooter(data.grandTotal);
  doc.end();

  return sendStream(event, doc as unknown as Readable);
});

function cell(
  x: number,
  y: number,
  w: number,
  h: number,
  text = "",
  align: "center" | "left" = "center",
  bold = false
) {
  doc.rect(x, y, w, h).stroke();
  doc.font(bold ? FONT_BOLD : FONT_NORMAL);
  doc.text(text, align === "left" ? x + 5 : x, y + h / 2 - 4, {
    width: w,
    align,
  });
}

function sumValues<T>(obj: Record<string | number, T>, fn: (v: T) => number) {
  return Object.values(obj ?? {}).reduce((a, v) => a + fn(v), 0);
}

function renderHeader() {
  const textWidth = 400;
  const x = (doc.page.width - textWidth) / 2;
  doc
    .fontSize(20)
    .text(
      "Pendataan Siswa Kelas 6 SD dan Kelas 9 SMP PPDB TA 2024/2025",
      x,
      30,
      { width: textWidth, align: "center" }
    );
}

function renderTableHeader() {
  let x = START_X;

  cell(x, y, COL_WIDTHS[0], ROW_HEIGHT * 2, "NO");
  x += COL_WIDTHS[0];

  cell(x, y, COL_WIDTHS[1], ROW_HEIGHT * 2, "KELOMPOK");
  x += COL_WIDTHS[1];

  // SD
  cell(x, y, COL_WIDTHS[2] + COL_WIDTHS[3], ROW_HEIGHT, "SD KELAS 6");
  cell(x, y + ROW_HEIGHT, COL_WIDTHS[2], ROW_HEIGHT, "(L)");
  cell(x + COL_WIDTHS[2], y + ROW_HEIGHT, COL_WIDTHS[3], ROW_HEIGHT, "(P)");
  x += COL_WIDTHS[2] + COL_WIDTHS[3];

  // SMP
  cell(x, y, COL_WIDTHS[4] + COL_WIDTHS[5], ROW_HEIGHT, "SMP KELAS 9");
  cell(x, y + ROW_HEIGHT, COL_WIDTHS[4], ROW_HEIGHT, "(L)");
  cell(x + COL_WIDTHS[4], y + ROW_HEIGHT, COL_WIDTHS[5], ROW_HEIGHT, "(P)");
  x += COL_WIDTHS[4] + COL_WIDTHS[5];

  cell(x, y, COL_WIDTHS[6], ROW_HEIGHT * 2, "TOTAL");
  y += ROW_HEIGHT;
}

function renderTableData(
  desa: { id: number; name: string },
  kelompok: { id: number; name: string }[],
  count: Record<number, GenerusCount>
) {
  let x = START_X;
  y += ROW_HEIGHT;

  // Desa header row
  cell(
    x,
    y,
    COL_WIDTHS.reduce((a, i) => a + i, 0),
    ROW_HEIGHT,
    desa.name,
    "left",
    true
  );

  // Rows per kelompok
  for (const [index, item] of kelompok.entries()) {
    const c = count[item.id];
    x = START_X;
    y += ROW_HEIGHT;

    const total =
      (c?.countLaki6 ?? 0) +
      (c?.countPerempuan6 ?? 0) +
      (c?.countLaki9 ?? 0) +
      (c?.countPerempuan9 ?? 0);

    cell(x, y, COL_WIDTHS[0], ROW_HEIGHT, String(index + 1));
    x += COL_WIDTHS[0];
    cell(x, y, COL_WIDTHS[1], ROW_HEIGHT, item.name, "left");
    x += COL_WIDTHS[1];
    cell(x, y, COL_WIDTHS[2], ROW_HEIGHT, String(c?.countLaki6 ?? 0));
    x += COL_WIDTHS[2];
    cell(x, y, COL_WIDTHS[3], ROW_HEIGHT, String(c?.countPerempuan6 ?? 0));
    x += COL_WIDTHS[3];
    cell(x, y, COL_WIDTHS[4], ROW_HEIGHT, String(c?.countLaki9 ?? 0));
    x += COL_WIDTHS[4];
    cell(x, y, COL_WIDTHS[5], ROW_HEIGHT, String(c?.countPerempuan9 ?? 0));
    x += COL_WIDTHS[5];
    cell(x, y, COL_WIDTHS[6], ROW_HEIGHT, String(total));
  }

  // Subtotal
  y += ROW_HEIGHT;
  x = START_X;

  const subtotalLSD = sumValues(count, (i) => i.countLaki6);
  const subtotalPSD = sumValues(count, (i) => i.countPerempuan6);
  const subtotalLSMP = sumValues(count, (i) => i.countLaki9);
  const subtotalPSMP = sumValues(count, (i) => i.countPerempuan9);
  const subtotalTotal = subtotalLSD + subtotalPSD + subtotalLSMP + subtotalPSMP;

  cell(
    x,
    y,
    COL_WIDTHS[0] + COL_WIDTHS[1],
    ROW_HEIGHT,
    "Sub Total",
    "center",
    true
  );
  x += COL_WIDTHS[0] + COL_WIDTHS[1];
  cell(x, y, COL_WIDTHS[2], ROW_HEIGHT, String(subtotalLSD), "center", true);
  x += COL_WIDTHS[2];
  cell(x, y, COL_WIDTHS[3], ROW_HEIGHT, String(subtotalPSD), "center", true);
  x += COL_WIDTHS[3];
  cell(x, y, COL_WIDTHS[4], ROW_HEIGHT, String(subtotalLSMP), "center", true);
  x += COL_WIDTHS[4];
  cell(x, y, COL_WIDTHS[5], ROW_HEIGHT, String(subtotalPSMP), "center", true);
  x += COL_WIDTHS[5];
  cell(x, y, COL_WIDTHS[6], ROW_HEIGHT, String(subtotalTotal), "center", true);
}

function renderFooter(total: GenerusCount) {
  y += ROW_HEIGHT;
  let x = START_X;

  const totalSD = total.countLaki6 + total.countPerempuan6;
  const totalSMP = total.countLaki9 + total.countPerempuan9;
  const grand = totalSD + totalSMP;

  cell(
    x,
    y,
    COL_WIDTHS[0] + COL_WIDTHS[1],
    ROW_HEIGHT * 2,
    "GRAND TOTAL",
    "center",
    true
  );
  x += COL_WIDTHS[0] + COL_WIDTHS[1];

  // SD
  cell(
    x,
    y,
    COL_WIDTHS[2],
    ROW_HEIGHT,
    String(total.countLaki6),
    "center",
    true
  );
  cell(
    x + COL_WIDTHS[2],
    y,
    COL_WIDTHS[3],
    ROW_HEIGHT,
    String(total.countPerempuan6),
    "center",
    true
  );
  cell(
    x,
    y + ROW_HEIGHT,
    COL_WIDTHS[2] + COL_WIDTHS[3],
    ROW_HEIGHT,
    String(totalSD),
    "center",
    true
  );
  x += COL_WIDTHS[2] + COL_WIDTHS[3];

  // SMP
  cell(
    x,
    y,
    COL_WIDTHS[4],
    ROW_HEIGHT,
    String(total.countLaki9),
    "center",
    true
  );
  cell(
    x + COL_WIDTHS[4],
    y,
    COL_WIDTHS[5],
    ROW_HEIGHT,
    String(total.countPerempuan9),
    "center",
    true
  );
  cell(
    x,
    y + ROW_HEIGHT,
    COL_WIDTHS[4] + COL_WIDTHS[5],
    ROW_HEIGHT,
    String(totalSMP),
    "center",
    true
  );
  x += COL_WIDTHS[4] + COL_WIDTHS[5];

  // GRAND
  cell(x, y, COL_WIDTHS[6], ROW_HEIGHT * 2, String(grand), "center", true);
}
