import * as XLSX from "xlsx";
import type { H3Event } from "h3";

export function exportToXlsx(event: H3Event, title: string, data: object[]) {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  const buf = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });

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
