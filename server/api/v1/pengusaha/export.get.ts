import { getAllPengusahaExportService } from "~~/server/modules/pengusaha";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { kemandirian: ["view"] });

  const data = await getAllPengusahaExportService(user.daerahId);

  return exportToXlsx(event, "pengusaha", data);
});
