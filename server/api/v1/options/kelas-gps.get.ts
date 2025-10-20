import { getAllKelasGpsOptionsService } from "~~/server/modules/kelas-gps";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_desa: ["view"] });

  const data = await getAllKelasGpsOptionsService(user.desaId!);

  return HttpResponse(data.data);
});
