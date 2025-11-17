import { getAllKelasTahfidzService } from "~~/server/modules/kelas-tahfidz";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { tahfidz: ["view"] });

  const query = await getValidatedQuery(event, (q) => OKelas.parse(q));

  const data = await getAllKelasTahfidzService(user.daerahId, query);

  return HttpResponse(data.data, data.metadata);
});
