import {
  getAllPengajarService,
  OPengajarList,
} from "~~/server/modules/pengajar";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["view"] });

  const query = await getValidatedQuery(event, (q) => OPengajarList.parse(q));

  query.kelompokId = user.kelompokId!;
  query.desaId = user.desaId!;

  const data = await getAllPengajarService(user.daerahId, query);

  return HttpResponse(data.data, data.metadata);
});
