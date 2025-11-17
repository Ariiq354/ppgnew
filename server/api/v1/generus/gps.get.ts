import { getAllGenerusGpsService } from "~~/server/modules/generus-gps";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_desa: ["view"] });

  const query = await getValidatedQuery(event, (q) =>
    OGenerusBaseList.parse(q)
  );

  query.desaId = user.desaId!;

  const data = await getAllGenerusGpsService(user.daerahId, query);

  return HttpResponse(data.data, data.metadata);
});
