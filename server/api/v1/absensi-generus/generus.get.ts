import { getAllGenerusExcludeService } from "~~/server/modules/absensi-generus";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["view"] });

  const query = await getValidatedQuery(event, (q) =>
    OGenerusAbsensiList.parse(q)
  );

  const data = await getAllGenerusExcludeService(user.kelompokId!, query);

  return HttpResponse(data.data, data.metadata);
});
