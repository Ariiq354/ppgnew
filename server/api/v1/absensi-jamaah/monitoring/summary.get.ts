import { getAbsensiJamaahMonitoringSummaryService } from "~~/server/modules/absensi-jamaah";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["view"] });

  const data = await getAbsensiJamaahMonitoringSummaryService(user.kelompokId!);

  return HttpResponse(data);
});
