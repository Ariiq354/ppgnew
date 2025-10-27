import { getAllGenerusExportTahfidzService } from "~~/server/modules/generus-tahfidz";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { tahfidz: ["view"] });

  const data = await getAllGenerusExportTahfidzService(user.desaId!);

  return await exportToXlsx(event, "generus", data);
});
