import { getAbsensiMudamudiMonitoringSummaryService } from "~~/server/modules/absensi-mudamudi";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { kurikulum: ["view"] });

  const query = await getValidatedQuery(event, (q) =>
    OAbsensiKelasPengajianList.parse(q)
  );

  const data = await getAbsensiMudamudiMonitoringSummaryService(
    user.daerahId,
    query
  );

  return HttpResponse(data);
});
