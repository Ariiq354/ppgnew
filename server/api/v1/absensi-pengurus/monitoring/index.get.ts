import { getAllMusyawarahOptions } from "~~/server/repository/musyawarah.repo";
import { getAllPengurusAbsensi } from "~~/server/repository/pengurus.repo";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { sekretariat: ["view"] });

  const query = await getValidatedQuery(event, (q) =>
    OSearchPagination.parse(q)
  );

  const data = await getAllPengurusAbsensi(user.daerahId, query);
  const musyawarah = await getAllMusyawarahOptions(user.daerahId);

  data.data = data.data.map((i) => {
    const total = musyawarah.data.length;
    return {
      ...i,
      tanpaKeterangan: total - i.hadir - i.izin,
      kehadiran: total > 0 ? ((i.hadir + i.izin) * 100) / total : 0,
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
