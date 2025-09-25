import { getAllDesa } from "~~/server/repository/desa.repo";
import { ODesaList } from "./_dto";

export default defineEventHandler(async (event) => {
  authGuard(event);

  const query = await getValidatedQuery(event, (q) => ODesaList.parse(q));

  const data = await getAllDesa(query);
  const metadata = {
    page: query.page,
    itemPerPage: query.limit,
    total: data.total,
    totalPage: Math.ceil(data.total / query.limit),
  };

  return HttpResponse(data.data, metadata);
});
