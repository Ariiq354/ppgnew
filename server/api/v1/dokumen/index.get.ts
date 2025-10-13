import { getAllDokumenService } from "~~/server/modules/dokumen";

export default defineEventHandler(async (event) => {
  const user = authGuard(event);
  const query = await getValidatedQuery(event, (q) => OPagination.parse(q));

  const data = await getAllDokumenService(user.daerahId, query);

  return HttpResponse(data.data, data.metadata);
});
