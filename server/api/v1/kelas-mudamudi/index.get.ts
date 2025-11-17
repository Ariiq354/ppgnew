import { getAllKelasMudamudiService } from "~~/server/modules/kelas-mudamudi";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { kegiatan_muda_mudi: ["view"] });

  const query = await getValidatedQuery(event, (q) => OKelasMudamudi.parse(q));

  const data = await getAllKelasMudamudiService(user.daerahId, query);

  return HttpResponse(data.data, data.metadata);
});
