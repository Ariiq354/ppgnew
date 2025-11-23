import {
  getAbsensiGenerusSummaryService,
  OAbsensiKelasPengajianForDesaList,
} from "~~/server/modules/absensi-generus";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_desa: ["view"] });

  const query = await getValidatedQuery(event, (q) =>
    OAbsensiKelasPengajianForDesaList.parse(q)
  );

  const data = await getAbsensiGenerusSummaryService(
    { daerahId: user.daerahId, desaId: user.desaId! },
    query
  );

  return HttpResponse(data);
});
