import { getLaporanMusyawarahByMusyawarahId } from "~~/server/repository/musyawarah/laporan-musyawarah.repo";
import { OSummaryLaporanMusyawarahList } from "./_dto";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { sekretariat: ["view"] });

  const query = await getValidatedQuery(event, (q) =>
    OSummaryLaporanMusyawarahList.parse(q)
  );

  const data = await getLaporanMusyawarahByMusyawarahId(user.daerahId, query);

  const grouped = data.reduce(
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
