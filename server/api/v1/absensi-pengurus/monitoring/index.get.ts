import { getAllMusyawarahOptions } from "~~/server/services/musyawarah/musyawarah.service";
import { OPengurusList } from "~~/server/services/pengurus/dto/pengurus.dto";
import { getAllPengurusAbsensi } from "~~/server/services/pengurus/pengurus.service";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { sekretariat: ["view"] });

  const query = await getValidatedQuery(event, (q) => OPengurusList.parse(q));

  const data = await getAllPengurusAbsensi(user.daerahId, query);
  const musyawarah = await getAllMusyawarahOptions(user.daerahId);

  data.data = data.data.map((i) => {
    return {
      ...i,
      tanpaKeterangan: musyawarah.data.length - i.hadir - i.izin,
      kehadiran: (((i.hadir + i.izin) * 100) / musyawarah.data.length).toFixed(
        0
      ),
    };
  });

  const metadata = {
    page: query.page,
    itemPerPage: query.limit,
    total: data.total,
    totalPage: Math.ceil(data.total / query.limit),
  };

  return HttpResponse(data.data, metadata);
});
