import { getAllKelasKeptrian } from "~~/server/services/kelas-keputrian/kelas-keputrian.service";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { keputrian: ["view"] });

  const query = await getValidatedQuery(event, (q) => OKelasList.parse(q));

  const data = await getAllKelasKeptrian(user.daerahId, query);
  const metadata = {
    page: query.page,
    itemPerPage: query.limit,
    total: data.total,
    totalPage: Math.ceil(data.total / query.limit),
  };

  return HttpResponse(data.data, metadata);
});
