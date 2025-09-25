import { getAllProker } from "~~/server/repository/proker.repo";
import { OProkerList } from "../proker/_dto";

export default defineEventHandler(async (event) => {
  const user = authGuard(event);

  const query = await getValidatedQuery(event, (q) => OProkerList.parse(q));

  const data = await getAllProker(user.daerahId, query);
  const metadata = {
    page: query.page,
    itemPerPage: query.limit,
    total: data.total,
    totalPage: Math.ceil(data.total / query.limit),
  };

  return HttpResponse(data.data, metadata);
});
