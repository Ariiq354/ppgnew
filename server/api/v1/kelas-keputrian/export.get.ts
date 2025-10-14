import { getAllKelasKeputrianExportService } from "~~/server/modules/kelas-keputrian";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { keputrian: ["view"] });

  const data = await getAllKelasKeputrianExportService(user.daerahId);

  return exportToXlsx(event, "kelas-keputrian", data);
});
