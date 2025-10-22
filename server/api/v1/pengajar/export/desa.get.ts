import { getAllPengajarExportDesaService } from "~~/server/modules/pengajar";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_desa: ["view"] });

  const data = await getAllPengajarExportDesaService(user.desaId!);

  return await exportToXlsx(event, "pengajar", data);
});
