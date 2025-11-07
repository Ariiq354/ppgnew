import {
  getAbsensiGenerusMonitoringForDesaService,
  OGenerusAbsensiForDesaList,
} from "~~/server/modules/absensi-generus";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_desa: ["view"] });

  const query = await getValidatedQuery(event, (q) =>
    OGenerusAbsensiForDesaList.parse(q)
  );

  const data = await getAbsensiGenerusMonitoringForDesaService(
    user.desaId!,
    query
  );

  return HttpResponse(data.data, data.metadata);
});
