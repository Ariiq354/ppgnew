import { getAllKelasKeputrianExport } from "~~/server/repository/kelas-keputrian.repo";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { keputrian: ["view"] });

  const data = await getAllKelasKeputrianExport(user.daerahId);

  return exportToXlsx(event, "kelas-keputrian", data);
});
