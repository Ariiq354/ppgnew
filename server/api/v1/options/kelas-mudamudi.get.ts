import { getAllKelasMudamudiOptionsService } from "~~/server/modules/kelas-mudamudi";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { kegiatan_muda_mudi: ["view"] });

  const query = await getValidatedQuery(event, (q) =>
    OKelasOptionsList.parse(q)
  );

  const data = await getAllKelasMudamudiOptionsService(user.daerahId, query);

  return HttpResponse(data.data);
});
