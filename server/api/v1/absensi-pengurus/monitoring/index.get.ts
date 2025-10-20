import { getAbsensiPengurusMonitoringService } from "~~/server/modules/absensi-pengurus";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { sekretariat: ["view"] });

  const query = await getValidatedQuery(event, (q) =>
    OSearchPagination.parse(q)
  );

  const data = await getAbsensiPengurusMonitoringService(user.daerahId, query);

  return HttpResponse(data.data, data.metadata);
});
