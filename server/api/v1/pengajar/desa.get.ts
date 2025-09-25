import { OPengajarList } from "~~/server/services/pengajar/pengajar.dto";
import { getAllPengajar } from "~~/server/services/pengajar/pengajar.service";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_desa: ["view"] });

  const query = await getValidatedQuery(event, (q) => OPengajarList.parse(q));

  query.desaId = user.desaId!;

  const data = await getAllPengajar(user.daerahId, query);
  const metadata = {
    page: query.page,
    itemPerPage: query.limit,
    total: data.total,
    totalPage: Math.ceil(data.total / query.limit),
  };

  return HttpResponse(data.data, metadata);
});
