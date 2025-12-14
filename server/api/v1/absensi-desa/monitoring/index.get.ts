import {
  getAbsensiDesaMonitoringService,
  OGenerusDesaAbsensiList,
} from "~~/server/modules/absensi-desa";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_desa: ["view"] });

  const query = await getValidatedQuery(event, (q) =>
    OGenerusDesaAbsensiList.parse(q)
  );

  const data = await getAbsensiDesaMonitoringService(user.desaId!, query);

  return HttpResponse(data.data, data.metadata);
});
