import { getAllDesa } from "~~/server/services/desa/desa.service";
import { ODesaList } from "~~/server/services/desa/dto/desa.dto";

export default defineEventHandler(async (event) => {
  authGuard(event);

  const query = await getValidatedQuery(event, (query) =>
    ODesaList.parse(query)
  );

  const data = await getAllDesa(query);
  const metadata = {
    page: query.page,
    itemPerPage: query.limit,
    total: data.total,
    totalPage: Math.ceil(data.total / query.limit),
  };

  return HttpResponse(data.data, metadata);
});
