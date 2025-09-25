import { getAllDokumen } from "~~/server/repository/dokumen.repo";

export default defineEventHandler(async (event) => {
  const user = authGuard(event);
  const query = await getValidatedQuery(event, (q) => OPagination.parse(q));

  const data = await getAllDokumen(user.daerahId, query);

  const metadata = {
    page: query.page,
    itemPerPage: query.limit,
    total: data.total,
    totalPage: Math.ceil(data.total / query.limit),
  };

  return HttpResponse(data.data, metadata);
});
