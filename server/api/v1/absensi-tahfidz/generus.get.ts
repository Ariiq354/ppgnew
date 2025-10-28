import { getAllTahfidzExcludeService } from "~~/server/modules/absensi-tahfidz";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { tahfidz: ["view"] });

  const query = await getValidatedQuery(event, (q) =>
    OSearchPagination.parse(q)
  );

  const data = await getAllTahfidzExcludeService(user.daerahId, query);

  return HttpResponse(data.data, data.metadata);
});
