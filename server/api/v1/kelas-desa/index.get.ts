import { getAllKelasDesaService } from "~~/server/modules/kelas-desa";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_desa: ["view"] });

  const query = await getValidatedQuery(event, (q) => OKelasGenerus.parse(q));

  const data = await getAllKelasDesaService(user.desaId!, query);

  return HttpResponse(data.data, data.metadata);
});
