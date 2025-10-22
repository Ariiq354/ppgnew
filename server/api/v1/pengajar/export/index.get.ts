import { getAllPengajarExportService } from "~~/server/modules/pengajar";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["view"] });

  const data = await getAllPengajarExportService(user.kelompokId!);

  return await exportToXlsx(event, "pengajar", data);
});
