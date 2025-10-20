import { getAbsensiGenerusSummaryService } from "~~/server/modules/absensi-generus";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["view"] });

  const query = await getValidatedQuery(event, (q) =>
    OAbsensiKelasPengajianList.parse(q)
  );

  const data = await getAbsensiGenerusSummaryService(user.kelompokId!, query);

  return HttpResponse(data);
});
