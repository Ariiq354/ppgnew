import { getAllKelasGps } from "~~/server/services/kelas-gps/kelas-gps.service";
import { OKegiatan } from "~~/server/utils/dto";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_desa: ["view"] });

  const query = await getValidatedQuery(event, (q) => OKegiatan.parse(q));

  const data = await getAllKelasGps(user.desaId!, query);
  const metadata = {
    page: query.page,
    itemPerPage: query.limit,
    total: data.total,
    totalPage: Math.ceil(data.total / query.limit),
  };

  return HttpResponse(data.data, metadata);
});
