import { getAllKelasTahfidzExportService } from "~~/server/modules/kelas-tahfidz";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { tahfidz: ["view"] });

  const data = await getAllKelasTahfidzExportService(user.daerahId);

  return await exportToXlsx(event, "kelas-tahfidz", data);
});
