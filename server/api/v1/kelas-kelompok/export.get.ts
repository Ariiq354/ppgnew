import { getAllKelasExportService } from "~~/server/modules/kelas-kelompok";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["view"] });

  const data = await getAllKelasExportService(user.kelompokId!);

  return exportToXlsx(event, "kelas-kelompok", data);
});
