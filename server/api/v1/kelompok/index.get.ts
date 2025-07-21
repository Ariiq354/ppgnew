import { getAllKelompok } from "~~/server/services/kelompok/kelompok.service";
import { OKelompokList } from "~~/server/services/kelompok/dto/kelompok.dto";

export default defineEventHandler(async (event) => {
  authGuard(event);

  const query = await getValidatedQuery(event, (query) =>
    OKelompokList.parse(query)
  );

  const data = await getAllKelompok(query);
  const metadata = {
    page: query.page,
    itemPerPage: query.limit,
    total: data.total,
    totalPage: Math.ceil(data.total / query.limit),
  };

  return HttpResponse(data.data, metadata);
});
