import {
  getAbsensiGenerusMonitoringForDaerahService,
  OGenerusAbsensiForDaerahList,
} from "~~/server/modules/absensi-generus";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { kurikulum: ["view"] });

  const query = await getValidatedQuery(event, (q) =>
    OGenerusAbsensiForDaerahList.parse(q)
  );

  const data = await getAbsensiGenerusMonitoringForDaerahService(
    user.daerahId,
    query
  );

  return HttpResponse(data.data, data.metadata);
});
