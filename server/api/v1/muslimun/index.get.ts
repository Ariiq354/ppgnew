import { OMuslimunList } from "~~/server/services/muslimun/dto/muslimun.dto";
import { getAllMuslimun } from "~~/server/services/muslimun/muslimun.service";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["view"] });

  const query = await getValidatedQuery(event, (q) => OMuslimunList.parse(q));

  const data = await getAllMuslimun(user.kelompokId!, query);
  const metadata = {
    page: query.page,
    itemPerPage: query.limit,
    total: data.total,
    totalPage: Math.ceil(data.total / query.limit),
  };

  return HttpResponse(data.data, metadata);
});
