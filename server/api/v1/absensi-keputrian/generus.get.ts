import { getAllKeputrianExclude } from "~~/server/services/absensi-keputrian/absensi-keputrian.service";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { keputrian: ["view"] });

  const query = await getValidatedQuery(event, (q) =>
    OGenerusAbsensiList.parse(q)
  );

  const data = await getAllKeputrianExclude(user.daerahId, query);

  const metadata = {
    page: query.page,
    itemPerPage: query.limit,
    total: data.total,
    totalPage: Math.ceil(data.total / query.limit),
  };

  return HttpResponse(data.data, metadata);
});
