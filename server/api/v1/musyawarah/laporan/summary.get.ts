import { OSummaryLaporanMusyawarahList } from "~~/server/services/laporan-musyawarah/laporan-musyawarah.dto";
import { getLaporanMusyawarahByMusyawarahId } from "~~/server/services/laporan-musyawarah/laporan-musyawarah.service";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { sekretariat: ["view"] });

  const query = await getValidatedQuery(event, (q) =>
    OSummaryLaporanMusyawarahList.parse(q)
  );

  const data = await getLaporanMusyawarahByMusyawarahId(user.daerahId, query);

  const grouped = data.data.reduce(
    (acc, item) => {
      if (!acc[item.bidang]) {
        acc[item.bidang] = [];
      }
      acc[item.bidang]!.push({
        laporan: item.laporan,
        keterangan: item.keterangan,
      });
      return acc;
    },
    {} as Record<string, { laporan: string; keterangan: string }[]>
  );

  return HttpResponse(grouped);
});
