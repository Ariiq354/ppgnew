import {
  getAbsensiDesaMonitoringForDaerahService,
  OGenerusDesaAbsensiListForMudamudi,
} from "~~/server/modules/absensi-desa";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { kegiatan_muda_mudi: ["view"] });

  const query = await getValidatedQuery(event, (q) =>
    OGenerusDesaAbsensiListForMudamudi.parse(q)
  );

  const data = await getAbsensiDesaMonitoringForDaerahService(user.daerahId, {
    ...query,
    kelasPengajian: "Muda-mudi",
  });

  return HttpResponse(data.data, data.metadata);
});
