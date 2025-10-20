import { getAbsensiJamaahMonitoringService } from "~~/server/modules/absensi-jamaah";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["view"] });

  const query = await getValidatedQuery(event, (q) =>
    OSearchPagination.parse(q)
  );

  const data = await getAbsensiJamaahMonitoringService(user.kelompokId!, query);

  return HttpResponse(data.data, data.metadata);
});
