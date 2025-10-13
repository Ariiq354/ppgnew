import { getAllPengusahaService } from "~~/server/modules/pengusaha";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { kemandirian: ["view"] });

  const query = await getValidatedQuery(event, (q) =>
    OSearchPagination.parse(q)
  );

  const data = await getAllPengusahaService(user.daerahId, query);

  return HttpResponse(data.data, data.metadata);
});
