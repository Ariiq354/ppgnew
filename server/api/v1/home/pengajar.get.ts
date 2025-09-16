import { OPengajarList } from "~~/server/services/pengajar/dto/pengajar.dto";
import { getAllPengajar } from "~~/server/services/pengajar/pengajar.service";

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
