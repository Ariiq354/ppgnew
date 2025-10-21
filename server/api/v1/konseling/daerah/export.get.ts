import { getAllKonselingExportService } from "~~/server/modules/konseling";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["view"] });

  const data = await getAllKonselingExportService(user.daerahId);

  return exportToXlsx(event, "konseling", data);
});
