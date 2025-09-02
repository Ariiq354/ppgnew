import * as XLSX from "xlsx";
import { z } from "zod/mini";
import { getAllProkerExport } from "~~/server/services/proker/proker.service";
import { roles } from "~~/shared/permission";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { proker: ["view"] });

  const bidang = getRouterParam(event, "bidang");
  const parsed = z.enum(roles).parse(bidang);

  const data = await getAllProkerExport(user.daerahId, parsed);

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
    `attachment; filename="generus-${new Date().toISOString().slice(0, 10)}.xlsx"`
  );

  return buf;
});
