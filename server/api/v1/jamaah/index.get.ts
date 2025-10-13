import { getAllJamaahService } from "~~/server/modules/jamaah";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["view"] });

  const query = await getValidatedQuery(event, (q) =>
    OSearchPagination.parse(q)
  );

  const data = await getAllJamaahService(user.kelompokId!, query);

  return HttpResponse(data.data, data.metadata);
});
