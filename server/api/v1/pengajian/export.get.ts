import { getAllPengajianExport } from "~~/server/repository/pengajian.repo";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["view"] });

  const data = await getAllPengajianExport(user.kelompokId!);

  return exportToXlsx(event, "pengajian", data);
});
