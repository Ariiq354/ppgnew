import { OJamaahList } from "~~/server/services/jamaah/dto/jamaah.dto";
import { getAllJamaah } from "~~/server/services/jamaah/jamaah.service";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["view"] });

  const query = await getValidatedQuery(event, (q) => OJamaahList.parse(q));

  const data = await getAllJamaah(user.kelompokId!, query);
  const metadata = {
    page: query.page,
    itemPerPage: query.limit,
    total: data.total,
    totalPage: Math.ceil(data.total / query.limit),
  };

  return HttpResponse(data.data, metadata);
});
