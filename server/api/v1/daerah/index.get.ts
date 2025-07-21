import { getAllDaerah } from "~~/server/services/daerah/daerah.service";
import { OPagination } from "~~/server/utils/dto";

export default defineEventHandler(async (event) => {
  authGuard(event);

  const query = await getValidatedQuery(event, (q) => OPagination.parse(q));

  const data = await getAllDaerah(query);
  const metadata = {
    page: query.page,
    itemPerPage: query.limit,
    total: data.total,
    totalPage: Math.ceil(data.total / query.limit),
  };

  return HttpResponse(data.data, metadata);
});
