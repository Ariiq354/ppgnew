import { getAllGenerusExportGpsService } from "~~/server/modules/generus";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_desa: ["view"] });

  const data = await getAllGenerusExportGpsService(user.desaId!);

  return await exportToXlsx(event, "generus", data);
});
