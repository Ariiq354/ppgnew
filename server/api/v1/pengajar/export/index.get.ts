import { getAllPengajarExport } from "~~/server/repository/pengajar.repo";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["view"] });

  const data = await getAllPengajarExport(user.kelompokId!);

  return exportToXlsx(event, "pengajar", data);
});
