import { getAllPengurusExport } from "~~/server/repository/pengurus.repo";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { sekretariat: ["view"] });

  const data = await getAllPengurusExport(user.daerahId);

  return exportToXlsx(event, "pengurus", data);
});
