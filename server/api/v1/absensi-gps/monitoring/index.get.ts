import { getAbsensiGpsMonitoringService } from "~~/server/modules/absensi-gps";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_desa: ["view"] });

  const query = await getValidatedQuery(event, (q) =>
    OGenerusAbsensiList.parse(q)
  );

  const data = await getAbsensiGpsMonitoringService(user.desaId!, query);

  return HttpResponse(data.data, data.metadata);
});
