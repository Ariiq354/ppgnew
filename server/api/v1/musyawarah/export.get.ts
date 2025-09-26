import { getAllMusyawarahExport } from "~~/server/repository/musyawarah/musyawarah.repo";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { sekretariat: ["view"] });

  const data = await getAllMusyawarahExport(user.daerahId);

  return exportToXlsx(event, "musyawarah", data);
});
