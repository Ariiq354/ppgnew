import { getAbsensiDesaMonitoringSummaryService } from "~~/server/modules/absensi-desa";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_desa: ["view"] });

  const query = await getValidatedQuery(event, (q) =>
    OAbsensiKelasPengajianGenerusList.parse(q)
  );

  const data = await getAbsensiDesaMonitoringSummaryService(
    user.desaId!,
    query
  );

  return HttpResponse(data);
});
