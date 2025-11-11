import {
  getAbsensiGenerusMonitoringForDaerahService,
  OGenerusAbsensiForMudamudiList,
} from "~~/server/modules/absensi-generus";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { kegiatan_muda_mudi: ["view"] });

  const query = await getValidatedQuery(event, (q) =>
    OGenerusAbsensiForMudamudiList.parse(q)
  );

  const data = await getAbsensiGenerusMonitoringForDaerahService(
    user.daerahId,
    { ...query, kelasPengajian: "Muda-mudi" }
  );

  return HttpResponse(data.data, data.metadata);
});
