import { getAllKelasGpsService } from "~~/server/modules/kelas-gps";
import { OKegiatan } from "~~/server/utils/dto";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_desa: ["view"] });

  const query = await getValidatedQuery(event, (q) => OKegiatan.parse(q));

  const data = await getAllKelasGpsService(user.desaId!, query);

  return HttpResponse(data.data, data.metadata);
});
