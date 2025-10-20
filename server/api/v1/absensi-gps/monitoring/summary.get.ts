import { getAbsensiGpsMonitoringSummaryService } from "~~/server/modules/absensi-gps";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_desa: ["view"] });

  const query = await getValidatedQuery(event, (q) =>
    OAbsensiKelasPengajianList.parse(q)
  );

  const data = await getAbsensiGpsMonitoringSummaryService(user.desaId!, query);

  return HttpResponse(data);
});
