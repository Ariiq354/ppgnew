import { getAllGenerusService } from "~~/server/modules/generus";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["view"] });

  const query = await getValidatedQuery(event, (q) => OGenerusList.parse(q));

  query.kelompokId = user.kelompokId!;
  query.desaId = user.desaId!;

  const data = await getAllGenerusService(user.daerahId, query);

  return HttpResponse(data.data, data.metadata);
});
