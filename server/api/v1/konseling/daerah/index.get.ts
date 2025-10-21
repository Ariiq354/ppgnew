import { getAllKonselingDaerahService } from "~~/server/modules/konseling";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { bimbingan_konseling: ["view"] });

  const query = await getValidatedQuery(event, (q) =>
    OSearchPagination.parse(q)
  );

  const data = await getAllKonselingDaerahService(user.daerahId, query);

  return HttpResponse(data.data, data.metadata);
});
