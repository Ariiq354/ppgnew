import { getAbsensiPengurusMonitoringSummaryService } from "~~/server/modules/absensi-pengurus";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { sekretariat: ["view"] });

  const data = await getAbsensiPengurusMonitoringSummaryService(user.daerahId);

  return HttpResponse(data);
});
