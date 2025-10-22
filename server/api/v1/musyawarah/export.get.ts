import { getAllMusyawarahExportService } from "~~/server/modules/musyawarah";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { sekretariat: ["view"] });

  const data = await getAllMusyawarahExportService(user.daerahId);

  return await exportToXlsx(event, "musyawarah", data);
});
