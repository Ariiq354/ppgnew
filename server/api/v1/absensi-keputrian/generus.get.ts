import { getAllKeputrianExcludeService } from "~~/server/modules/generus-keputrian";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { keputrian: ["view"] });

  const query = await getValidatedQuery(event, (q) =>
    OGenerusAbsensiList.parse(q)
  );

  const data = await getAllKeputrianExcludeService(user.daerahId, query);

  return HttpResponse(data.data, data.metadata);
});
