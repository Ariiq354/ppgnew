import { getAllKelasKeputrianOptionsService } from "~~/server/modules/kelas-keputrian";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { keputrian: ["view"] });

  const query = await getValidatedQuery(event, (q) =>
    OKelasMudamudiList.parse(q)
  );

  const data = await getAllKelasKeputrianOptionsService(user.daerahId, query);

  return HttpResponse(data.data);
});
