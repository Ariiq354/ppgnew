import { getAbsensiMudamudiMonitoringSummaryService } from "~~/server/modules/absensi-mudamudi";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { kegiatan_muda_mudi: ["view"] });

  const query = await getValidatedQuery(event, (q) =>
    OAbsensiKelasPengajianMudamudiList.parse(q)
  );

  const data = await getAbsensiMudamudiMonitoringSummaryService(
    user.daerahId,
    query
  );

  return HttpResponse(data);
});
