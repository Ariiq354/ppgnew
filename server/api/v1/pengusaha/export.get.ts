import { getAllPengusahaExport } from "~~/server/repository/pengusaha.repo";
import { exportToXlsx } from "~~/server/utils/export";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { kemandirian: ["view"] });

  const data = await getAllPengusahaExport(user.daerahId);

  return exportToXlsx(event, "pengusaha", data);
});
