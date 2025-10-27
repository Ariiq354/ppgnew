import { getAllGenerusMudamudiService } from "~~/server/modules/generus-mudamudi";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { kegiatan_muda_mudi: ["view"] });

  const query = await getValidatedQuery(event, (q) => OGenerusList.parse(q));

  const data = await getAllGenerusMudamudiService(user.daerahId, query);

  return HttpResponse(data.data, data.metadata);
});
