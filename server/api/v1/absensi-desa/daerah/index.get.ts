import {
  getAbsensiDesaMonitoringForDaerahService,
  OGenerusDesaAbsensiListForDaerah,
} from "~~/server/modules/absensi-desa";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { kurikulum: ["view"] });

  const query = await getValidatedQuery(event, (q) =>
    OGenerusDesaAbsensiListForDaerah.parse(q)
  );

  const data = await getAbsensiDesaMonitoringForDaerahService(
    user.daerahId,
    query
  );

  return HttpResponse(data.data, data.metadata);
});
