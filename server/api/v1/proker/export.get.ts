import * as XLSX from "xlsx";
import { getAllProkerExport } from "~~/server/services/proker/proker.service";
import { OBidangSchema } from "~~/server/utils/dto";
import { viewWhitelist } from "~~/shared/permission";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { musyawarah_bidang: ["view"] });

  const query = await getValidatedQuery(event, (q) => OBidangSchema.parse(q));

  if (!viewWhitelist.has(user.role!) && user.role !== query.bidang) {
    throw createError({
      statusCode: 403,
      statusMessage: "Unauthorized",
    });
  }

  const data = await getAllProkerExport(user.daerahId, query.bidang);

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
    `attachment; filename="musyawarah-${new Date().toISOString().slice(0, 10)}.xlsx"`
  );

  return buf;
});
