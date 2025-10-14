import {
  getLaporanMusyawarahBidangByMusyawarahIdService,
  OLaporanMusyawarahBidangList,
} from "~~/server/modules/laporan-musyawarah-bidang";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { musyawarah_bidang: ["view"] });

  const query = await getValidatedQuery(event, (q) =>
    OLaporanMusyawarahBidangList.parse(q)
  );

  const data = await getLaporanMusyawarahBidangByMusyawarahIdService(
    user,
    query
  );

  return HttpResponse(data);
});
