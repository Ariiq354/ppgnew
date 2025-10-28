import { getAbsensiMudamudiMonitoringService } from "~~/server/modules/absensi-mudamudi";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { kegiatan_muda_mudi: ["view"] });

  const query = await getValidatedQuery(event, (q) =>
    OGenerusAbsensiList.parse(q)
  );

  const data = await getAbsensiMudamudiMonitoringService(user.daerahId, query);

  return HttpResponse(data.data, data.metadata);
});
