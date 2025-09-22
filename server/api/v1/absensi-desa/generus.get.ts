import { getAllGenerusDesaExclude } from "~~/server/services/absensi-desa/absensi-desa.service";
import { OGenerusDesaAbsensiList } from "~~/server/services/absensi-desa/dto/absensi.desa.dto";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_desa: ["view"] });

  const query = await getValidatedQuery(event, (q) =>
    OGenerusDesaAbsensiList.parse(q)
  );

  const data = await getAllGenerusDesaExclude(user.desaId!, query);

  const metadata = {
    page: query.page,
    itemPerPage: query.limit,
    total: data.total,
    totalPage: Math.ceil(data.total / query.limit),
  };

  return HttpResponse(data.data, metadata);
});
