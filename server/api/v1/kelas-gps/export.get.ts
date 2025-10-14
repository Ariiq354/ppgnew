import { getAllKelasGpsExportService } from "~~/server/modules/kelas-gps";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_desa: ["view"] });

  const data = await getAllKelasGpsExportService(user.desaId!);

  return exportToXlsx(event, "kelas-gps", data);
});
