import { getAllKonselingService } from "~~/server/modules/konseling";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["view"] });

  const query = await getValidatedQuery(event, (q) =>
    OSearchPagination.parse(q)
  );

  const data = await getAllKonselingService(user.kelompokId!, query);

  return HttpResponse(data.data, data.metadata);
});
