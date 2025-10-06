import { getAllDesaService, ODesaList } from "~~/server/modules/desa";

export default defineEventHandler(async (event) => {
  authGuard(event);

  const query = await getValidatedQuery(event, (q) => ODesaList.parse(q));

  const data = await getAllDesaService(query);

  return HttpResponse(data.data, data.metadata);
});
