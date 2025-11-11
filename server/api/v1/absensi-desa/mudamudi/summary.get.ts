import {
  getAbsensiDesaMonitoringSummaryForDaerahService,
  OAbsensiKelasDesaPengajianForMudamudiList,
} from "~~/server/modules/absensi-desa";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { kegiatan_muda_mudi: ["view"] });

  const query = await getValidatedQuery(event, (q) =>
    OAbsensiKelasDesaPengajianForMudamudiList.parse(q)
  );

  const data = await getAbsensiDesaMonitoringSummaryForDaerahService(
    user.daerahId,
    { ...query, kelasPengajian: "Muda-mudi" }
  );

  return HttpResponse(data);
});
