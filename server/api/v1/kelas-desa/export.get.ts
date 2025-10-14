import { getAllKelasDesaExportService } from "~~/server/modules/kelas-desa";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_desa: ["view"] });

  const data = await getAllKelasDesaExportService(user.desaId!);

  return exportToXlsx(event, "kelas-desa", data);
});
