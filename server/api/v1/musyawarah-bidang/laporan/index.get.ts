import { OLaporanMusyawarahList } from "~~/server/modules/laporan-musyawarah";
import { getLaporanMusyawarahBidangService } from "~~/server/modules/laporan-musyawarah-bidang";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { musyawarah_bidang: ["view"] });

  const query = await getValidatedQuery(event, (q) =>
    OLaporanMusyawarahList.parse(q)
  );

  const data = await getLaporanMusyawarahBidangService(user, query);

  return HttpResponse(data);
});
