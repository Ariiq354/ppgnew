import { OLaporanMusyawarahList } from "~~/server/services/laporan-musyawarah/dto/laporan-musyawarah.dto";
import { getLaporanMusyawarahByMusyawarahId } from "~~/server/services/laporan-musyawarah/laporan-musyawarah.service";
import { viewWhitelist } from "~~/shared/permission";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { musyawarah_ppg: ["view"] });

  const query = await getValidatedQuery(event, (q) =>
    OLaporanMusyawarahList.parse(q)
  );

  if (!viewWhitelist.has(user.role!) && user.role !== query.bidang) {
    throw createError({
      statusCode: 403,
      statusMessage: "Unauthorized",
    });
  }

  const data = await getLaporanMusyawarahByMusyawarahId(user.daerahId, query);

  return HttpResponse(data.data);
});
