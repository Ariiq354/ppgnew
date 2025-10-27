import { getAllGenerusExportMudamudiService } from "~~/server/modules/generus-mudamudi";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { kegiatan_muda_mudi: ["view"] });

  const data = await getAllGenerusExportMudamudiService(user.desaId!);

  return await exportToXlsx(event, "generus", data);
});
