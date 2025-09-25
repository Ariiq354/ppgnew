import { OLaporanMusyawarahBidangList } from "~~/server/services/laporan-musyawarah-bidang/laporan-musyawarah-bidang.dto";
import { getLaporanMusyawarahBidangByMusyawarahId } from "~~/server/services/laporan-musyawarah-bidang/laporan-musyawarah-bidang.service";
import { viewWhitelist } from "~~/shared/permission";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { musyawarah_ppg: ["view"] });

  const query = await getValidatedQuery(event, (q) =>
    OLaporanMusyawarahBidangList.parse(q)
  );

  if (!viewWhitelist.has(user.role!) && user.role !== query.bidang) {
    throw createError({
      statusCode: 403,
      statusMessage: "Unauthorized",
    });
  }

  const data = await getLaporanMusyawarahBidangByMusyawarahId(
    user.daerahId,
    query
  );

  return HttpResponse(data.data);
});
