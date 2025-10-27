import { getAllKelasMudamudiExportService } from "~~/server/modules/kelas-mudamudi";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { kegiatan_muda_mudi: ["view"] });

  const data = await getAllKelasMudamudiExportService(user.daerahId);

  return await exportToXlsx(event, "kelas-mudamudi", data);
});
