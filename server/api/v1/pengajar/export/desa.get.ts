import { getAllPengajarExportDesa } from "~~/server/repository/pengajar.repo";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_desa: ["view"] });

  const data = await getAllPengajarExportDesa(user.desaId!);

  return exportToXlsx(event, "pengajar", data);
});
