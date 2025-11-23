import {
  getAbsensiGenerusMonitoringService,
  OGenerusAbsensiForDesaList,
} from "~~/server/modules/absensi-generus";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_desa: ["view"] });

  const query = await getValidatedQuery(event, (q) =>
    OGenerusAbsensiForDesaList.parse(q)
  );

  const data = await getAbsensiGenerusMonitoringService(
    { daerahId: user.daerahId, desaId: user.desaId! },
    query
  );

  return HttpResponse(data.data, data.metadata);
});
