import {
  getAbsensiGenerusForDaerahSummaryService,
  OAbsensiKelasPengajianForDaerahList,
} from "~~/server/modules/absensi-generus";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { kurikulum: ["view"] });

  const query = await getValidatedQuery(event, (q) =>
    OAbsensiKelasPengajianForDaerahList.parse(q)
  );

  const data = await getAbsensiGenerusForDaerahSummaryService(
    user.daerahId,
    query
  );

  return HttpResponse(data);
});
