import {
  getLaporanMusyawarahSummaryService,
  OSummaryLaporanMusyawarahList,
} from "~~/server/modules/laporan-musyawarah";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { sekretariat: ["view"] });

  const query = await getValidatedQuery(event, (q) =>
    OSummaryLaporanMusyawarahList.parse(q)
  );

  const data = await getLaporanMusyawarahSummaryService(user.daerahId, query);

  return HttpResponse(data);
});
