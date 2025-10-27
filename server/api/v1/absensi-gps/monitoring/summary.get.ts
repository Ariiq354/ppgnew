import { getAbsensiGpsMonitoringSummaryService } from "~~/server/modules/absensi-gps";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_desa: ["view"] });

  const data = await getAbsensiGpsMonitoringSummaryService(user.desaId!);

  return HttpResponse(data);
});
