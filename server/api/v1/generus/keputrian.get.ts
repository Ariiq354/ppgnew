import { getAllGenerusKeputrianService } from "~~/server/modules/generus-keputrian";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { keputrian: ["view"] });

  const query = await getValidatedQuery(event, (q) => OGenerusList.parse(q));

  const data = await getAllGenerusKeputrianService(user.daerahId, query);

  return HttpResponse(data.data, data.metadata);
});
