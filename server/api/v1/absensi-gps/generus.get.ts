import { getAllGpsExclude } from "~~/server/services/absensi-gps/absensi-gps.service";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_desa: ["view"] });

  const query = await getValidatedQuery(event, (q) =>
    OGenerusAbsensiList.parse(q)
  );

  const data = await getAllGpsExclude(user.desaId!, query);

  const metadata = {
    page: query.page,
    itemPerPage: query.limit,
    total: data.total,
    totalPage: Math.ceil(data.total / query.limit),
  };

  return HttpResponse(data.data, metadata);
});
