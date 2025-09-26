import { getAllKelasDesaExport } from "~~/server/repository/kelas-desa.repo";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_desa: ["view"] });

  const data = await getAllKelasDesaExport(user.desaId!);

  return exportToXlsx(event, "kelas-desa", data);
});
