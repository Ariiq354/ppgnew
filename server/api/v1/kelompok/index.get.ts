import { getAllKelompok } from "~~/server/repository/kelompok.repo";
import { OKelompokList } from "./_dto";

export default defineEventHandler(async (event) => {
  authGuard(event);

  const query = await getValidatedQuery(event, (q) => OKelompokList.parse(q));

  const data = await getAllKelompok(query);
  const metadata = {
    page: query.page,
    itemPerPage: query.limit,
    total: data.total,
    totalPage: Math.ceil(data.total / query.limit),
  };

  return HttpResponse(data.data, metadata);
});
