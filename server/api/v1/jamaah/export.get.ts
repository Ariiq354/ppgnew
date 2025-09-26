import { getAllJamaahExport } from "~~/server/repository/jamaah.repo";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["view"] });

  const data = await getAllJamaahExport(user.kelompokId!);

  return exportToXlsx(event, "jamaah", data);
});
