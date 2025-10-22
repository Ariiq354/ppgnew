import { getAllGenerusExportDesaService } from "~~/server/modules/generus";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_desa: ["view"] });

  const data = await getAllGenerusExportDesaService(user.desaId!);

  return await exportToXlsx(event, "generus", data);
});
