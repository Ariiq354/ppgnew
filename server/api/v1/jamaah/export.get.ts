import * as XLSX from "xlsx";
import { getAllJamaahExport } from "~~/server/services/jamaah/jamaah.service";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["view"] });

  const data = await getAllJamaahExport(user.kelompokId!);

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
    `attachment; filename="jamaah-${new Date().toISOString().slice(0, 10)}.xlsx"`
  );

  return buf;
});
