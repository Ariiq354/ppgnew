import { getAllKelasKeputrianService } from "~~/server/modules/kelas-keputrian";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { keputrian: ["view"] });

  const query = await getValidatedQuery(event, (q) =>
    OKegiatanWithNama.parse(q)
  );

  const data = await getAllKelasKeputrianService(user.daerahId, query);

  return HttpResponse(data.data, data.metadata);
});
