import { getLaporanMusyawarahByMusyawarahIdService } from "~~/server/services/musyawarah/laporan-musyawarah.service";
import { OLaporanMusyawarahList } from "./_dto";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { musyawarah_ppg: ["view"] });

  const query = await getValidatedQuery(event, (q) =>
    OLaporanMusyawarahList.parse(q)
  );

  const data = await getLaporanMusyawarahByMusyawarahIdService(user, query);

  return HttpResponse(data);
});
