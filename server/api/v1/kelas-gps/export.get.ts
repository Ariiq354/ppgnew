import { getAllKelasGpsExport } from "~~/server/repository/kelas-gps.repo";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_desa: ["view"] });

  const data = await getAllKelasGpsExport(user.desaId!);

  return exportToXlsx(event, "kelas-gps", data);
});
