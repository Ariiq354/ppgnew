import { getAllGenerusService } from "~~/server/modules/generus";

export default defineEventHandler(async (event) => {
  const user = authGuard(event);

  const query = await getValidatedQuery(event, (q) =>
    OGenerusGenericList.parse(q)
  );

  const data = await getAllGenerusService(user.daerahId, query);

  return HttpResponse(data.data, data.metadata);
});
