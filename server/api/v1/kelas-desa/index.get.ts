import { getAllKelasDesa } from "~~/server/services/kelas-desa/kelas-desa.service";
import { OKegiatanWithNama } from "~~/server/utils/dto";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_desa: ["view"] });

  const query = await getValidatedQuery(event, (q) =>
    OKegiatanWithNama.parse(q)
  );

  const data = await getAllKelasDesa(user.desaId!, query);
  const metadata = {
    page: query.page,
    itemPerPage: query.limit,
    total: data.total,
    totalPage: Math.ceil(data.total / query.limit),
  };

  return HttpResponse(data.data, metadata);
});
