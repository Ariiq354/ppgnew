import { getAllGenerusExportService } from "~~/server/modules/generus";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["view"] });

  const data = await getAllGenerusExportService(user.kelompokId!);

  return await exportToXlsx(event, "generus", data);
});
