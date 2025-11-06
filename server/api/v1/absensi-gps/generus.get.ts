import { getAllGpsExcludeService } from "~~/server/modules/generus-gps";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_desa: ["view"] });

  const query = await getValidatedQuery(event, (q) =>
    OSearchPagination.parse(q)
  );

  const data = await getAllGpsExcludeService(user.desaId!, query);

  return HttpResponse(data.data, data.metadata);
});
