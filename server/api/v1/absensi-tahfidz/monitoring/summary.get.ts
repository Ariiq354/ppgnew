import { getAbsensiTahfidzMonitoringSummaryService } from "~~/server/modules/absensi-tahfidz";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { tahfidz: ["view"] });

  const data = await getAbsensiTahfidzMonitoringSummaryService(user.daerahId);

  return HttpResponse(data);
});
