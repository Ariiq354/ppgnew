import { getAllMusyawarahService } from "~~/server/modules/musyawarah";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { sekretariat: ["view"] });

  const query = await getValidatedQuery(event, (q) =>
    OSearchPagination.parse(q)
  );

  const data = await getAllMusyawarahService(user.daerahId, query);

  return HttpResponse(data.data, data.metadata);
});
