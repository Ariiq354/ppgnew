import * as XLSX from "xlsx";
import { getAllPengusahaExport } from "~~/server/services/pengusaha/pengusaha.service";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { kemandirian: ["view"] });

  const data = await getAllPengusahaExport(user.daerahId);

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
    `attachment; filename="pengusaha-${new Date().toISOString().slice(0, 10)}.xlsx"`
  );

  return buf;
});
