import { getLaporanMusyawarahBidangByMusyawarahIdService } from "~~/server/services/musyawarah-bidang/laporan-musyawarah-bidang.service";
import { OLaporanMusyawarahBidangList } from "./_dto";

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
