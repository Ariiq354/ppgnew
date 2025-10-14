import { getAllPengurusService } from "~~/server/modules/pengurus";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { sekretariat: ["view"] });

  const query = await getValidatedQuery(event, (q) =>
    OSearchPagination.parse(q)
  );

  const data = await getAllPengurusService(user.daerahId, query);

  return HttpResponse(data.data, data.metadata);
});
