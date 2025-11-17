import { getAbsensiKeputrianMonitoringService } from "~~/server/modules/absensi-keputrian";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { keputrian: ["view"] });

  const query = await getValidatedQuery(event, (q) =>
    OMudamudiAbsensiList.parse(q)
  );

  const data = await getAbsensiKeputrianMonitoringService(user.daerahId, query);

  return HttpResponse(data.data, data.metadata);
});
