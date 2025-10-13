import { getAllProkerService, OProkerList } from "~~/server/modules/proker";

export default defineEventHandler(async (event) => {
  const user = authGuard(event);

  const query = await getValidatedQuery(event, (q) => OProkerList.parse(q));

  const data = await getAllProkerService(user, query);

  return HttpResponse(data.data, data.metadata);
});
