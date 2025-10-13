import { getAllPengajianExportService } from "~~/server/modules/pengajian";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["view"] });

  const data = await getAllPengajianExportService(user.kelompokId!);

  return exportToXlsx(event, "pengajian", data);
});
