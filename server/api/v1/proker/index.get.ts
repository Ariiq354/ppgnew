import { getAllProkerService } from "~~/server/services/proker.service";
import { OProkerList } from "./_dto";

export default defineEventHandler(async (event) => {
  const user = authGuard(event);

  const query = await getValidatedQuery(event, (q) => OProkerList.parse(q));

  const data = await getAllProkerService(user, query);

  const metadata = {
    page: query.page,
    itemPerPage: query.limit,
    total: data.total,
    totalPage: Math.ceil(data.total / query.limit),
  };

  return HttpResponse(data.data, metadata);
});
