import {
  getLaporanMuslimunSummaryService,
  OLaporanMuslimunDesaList,
} from "~~/server/modules/laporan-muslimun";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_desa: ["view"] });

  const query = await getValidatedQuery(event, (q) =>
    OLaporanMuslimunDesaList.parse(q)
  );

  const data = await getLaporanMuslimunSummaryService(
    user.desaId!,
    query.tahun,
    query.bulan
  );

  return HttpResponse(data);
});
