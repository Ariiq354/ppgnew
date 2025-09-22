import { getAllGenerusExclude } from "~~/server/services/absensi-generus/absensi-generus.service";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["view"] });

  const query = await getValidatedQuery(event, (q) =>
    OGenerusAbsensiList.parse(q)
  );

  const data = await getAllGenerusExclude(user.kelompokId!, query);

  const metadata = {
    page: query.page,
    itemPerPage: query.limit,
    total: data.total,
    totalPage: Math.ceil(data.total / query.limit),
  };

  return HttpResponse(data.data, metadata);
});
