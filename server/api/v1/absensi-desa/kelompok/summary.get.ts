import { getAbsensiDesaKelompokSummaryService } from "~~/server/modules/absensi-desa";
import { OAbsensiKelasPengajianKelompokList } from "~~/server/modules/absensi-generus";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_desa: ["view"] });

  const query = await getValidatedQuery(event, (q) =>
    OAbsensiKelasPengajianKelompokList.parse(q)
  );

  const data = await getAbsensiDesaKelompokSummaryService(user.desaId!, query);

  return HttpResponse(data);
});
