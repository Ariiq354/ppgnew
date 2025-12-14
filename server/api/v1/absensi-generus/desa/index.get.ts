import { OGenerusDesaAbsensiList } from "~~/server/modules/absensi-desa";
import { getAbsensiGenerusMonitoringService } from "~~/server/modules/absensi-generus";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_desa: ["view"] });

  const query = await getValidatedQuery(event, (q) =>
    OGenerusDesaAbsensiList.parse(q)
  );

  const data = await getAbsensiGenerusMonitoringService(
    {
      desaId: user.desaId!,
      kelompokId: query.kelompokId,
    },
    query
  );

  return HttpResponse(data.data, data.metadata);
});
