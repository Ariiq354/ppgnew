import {
  getAbsensiGenerusForDaerahSummaryService,
  OAbsensiKelasPengajianForMudamudiList,
} from "~~/server/modules/absensi-generus";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { kegiatan_muda_mudi: ["view"] });

  const query = await getValidatedQuery(event, (q) =>
    OAbsensiKelasPengajianForMudamudiList.parse(q)
  );

  const data = await getAbsensiGenerusForDaerahSummaryService(user.daerahId, {
    ...query,
    kelasPengajian: "Muda-mudi",
  });

  return HttpResponse(data);
});
