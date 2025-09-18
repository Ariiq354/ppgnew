import { getAllKeputrianExclude } from "~~/server/services/absensi-keputrian/absensi-keputrian.service";
import { OKeputrianAbsensiList } from "~~/server/services/absensi-keputrian/dto/absensi-keputrian.dto";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { keputrian: ["view"] });

  const query = await getValidatedQuery(event, (q) =>
    OKeputrianAbsensiList.parse(q)
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
