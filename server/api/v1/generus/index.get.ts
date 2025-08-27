import { OGenerusList } from "~~/server/services/generus/dto/generus.dto";
import { getAllGenerus } from "~~/server/services/generus/generus.service";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["view"] });

  const query = await getValidatedQuery(event, (q) => OGenerusList.parse(q));

  const data = await getAllGenerus(user.kelompokId!, query);
  const metadata = {
    page: query.page,
    itemPerPage: query.limit,
    total: data.total,
    totalPage: Math.ceil(data.total / query.limit),
  };

  return HttpResponse(data.data, metadata);
});
