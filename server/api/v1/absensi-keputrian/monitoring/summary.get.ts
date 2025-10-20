import { getAbsensiKeputrianMonitoringSummaryService } from "~~/server/modules/absensi-keputrian";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { keputrian: ["view"] });

  const query = await getValidatedQuery(event, (q) =>
    OAbsensiKelasPengajianList.parse(q)
  );

  const data = await getAbsensiKeputrianMonitoringSummaryService(
    user.daerahId,
    query
  );

  return HttpResponse(data);
});
