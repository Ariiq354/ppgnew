import {
  getLaporanMusyawarahByMusyawarahIdService,
  OLaporanMusyawarahList,
} from "~~/server/modules/laporan-musyawarah";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { musyawarah_ppg: ["view"] });

  const query = await getValidatedQuery(event, (q) =>
    OLaporanMusyawarahList.parse(q)
  );

  const data = await getLaporanMusyawarahByMusyawarahIdService(user, query);

  return HttpResponse(data);
});
