import ExcelJS from "exceljs";
import type { H3Event } from "h3";

export async function exportToXlsx(
  event: H3Event,
  title: string,
  data: object[]
) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Sheet1");

  worksheet.columns = Object.keys(data[0] || {}).map((key) => ({
    header: key,
    key,
  }));
  worksheet.addRows(data);

  const buf = await workbook.xlsx.writeBuffer();

  setHeader(
    event,
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  setHeader(
    event,
    "Content-Disposition",
    `attachment; filename="${title}-${new Date().toISOString().slice(0, 10)}.xlsx"`
  );

  return buf;
}
