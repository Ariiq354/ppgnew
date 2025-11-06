import {
  getAllGenerusExcludeForDesaService,
  OGenerusListForDesa,
} from "~~/server/modules/generus";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_desa: ["view"] });

  const query = await getValidatedQuery(event, (q) =>
    OGenerusListForDesa.parse(q)
  );

  const data = await getAllGenerusExcludeForDesaService(user.desaId!, query);

  return HttpResponse(data.data, data.metadata);
});
