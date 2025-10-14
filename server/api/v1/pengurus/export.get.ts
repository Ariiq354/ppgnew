import { getAllPengurusExportService } from "~~/server/modules/pengurus";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { sekretariat: ["view"] });

  const data = await getAllPengurusExportService(user.daerahId);

  return exportToXlsx(event, "pengurus", data);
});
