import { getAllKelasExport } from "~~/server/repository/kelas-kelompok.repo";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["view"] });

  const data = await getAllKelasExport(user.kelompokId!);

  return exportToXlsx(event, "kelas-kelompok", data);
});
