import { OPengajarList } from "~~/server/api/v1/pengajar/_dto";
import { getAllPengajar } from "~~/server/repository/pengajar.repo";

export default defineEventHandler(async (event) => {
  const user = authGuard(event);

  const query = await getValidatedQuery(event, (q) => OPengajarList.parse(q));

  const data = await getAllPengajar(user.daerahId, query);

  const metadata = {
    page: query.page,
    itemPerPage: query.limit,
    total: data.total,
    totalPage: Math.ceil(data.total / query.limit),
  };

  return HttpResponse(data.data, metadata);
});
