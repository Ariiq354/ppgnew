import { getAllJamaahExportService } from "~~/server/modules/jamaah";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["view"] });

  const data = await getAllJamaahExportService(user.kelompokId!);

  return await exportToXlsx(event, "jamaah", data);
});
