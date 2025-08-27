import { OKelasList } from "~~/server/services/kelas/dto/kelas.dto";
import { getAllKelas } from "~~/server/services/kelas/kelas.service";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["view"] });

  const query = await getValidatedQuery(event, (q) => OKelasList.parse(q));

  const data = await getAllKelas(user.kelompokId!, query);
  const metadata = {
    page: query.page,
    itemPerPage: query.limit,
    total: data.total,
    totalPage: Math.ceil(data.total / query.limit),
  };

  return HttpResponse(data.data, metadata);
});
