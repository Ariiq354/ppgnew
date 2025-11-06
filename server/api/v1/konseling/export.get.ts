import { getAllKonselingExportService } from "~~/server/modules/konseling";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["view"] });

  const data = await getAllKonselingExportService(user.kelompokId!);

  return await exportToXlsx(event, "konseling", data);
});
