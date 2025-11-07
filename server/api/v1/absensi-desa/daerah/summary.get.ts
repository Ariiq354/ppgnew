import {
  getAbsensiDesaMonitoringSummaryForDaerahService,
  OAbsensiKelasDesaPengajianForDaerahList,
} from "~~/server/modules/absensi-desa";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { kurikulum: ["view"] });

  const query = await getValidatedQuery(event, (q) =>
    OAbsensiKelasDesaPengajianForDaerahList.parse(q)
  );

  const data = await getAbsensiDesaMonitoringSummaryForDaerahService(
    user.daerahId,
    query
  );

  return HttpResponse(data);
});
