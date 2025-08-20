import { OMusyawarahList } from "~~/server/services/musyawarah/dto/musyawarah.dto";
import { getAllMusyawarah } from "~~/server/services/musyawarah/musyawarah.service";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { sekretariat: ["view"] });

  const query = await getValidatedQuery(event, (q) => OMusyawarahList.parse(q));

  const data = await getAllMusyawarah(user.daerahId, query);
  const metadata = {
    page: query.page,
    itemPerPage: query.limit,
    total: data.total,
    totalPage: Math.ceil(data.total / query.limit),
  };

  return HttpResponse(data.data, metadata);
});
