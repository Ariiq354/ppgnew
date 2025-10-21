import {
  getAllPengajarService,
  OPengajarList,
} from "~~/server/modules/pengajar";

export default defineEventHandler(async (event) => {
  const user = authGuard(event);

  const query = await getValidatedQuery(event, (q) => OPengajarList.parse(q));

  const data = await getAllPengajarService(user.daerahId, query);

  return HttpResponse(data.data, data.metadata);
});
