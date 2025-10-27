import { getAllGenerusExportKeputrianService } from "~~/server/modules/generus-keputrian";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { keputrian: ["view"] });

  const data = await getAllGenerusExportKeputrianService(user.desaId!);

  return await exportToXlsx(event, "generus", data);
});
