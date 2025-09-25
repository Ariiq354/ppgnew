import { getAllKelasGpsOptions } from "~~/server/services/kelas-gps/kelas-gps.service";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_desa: ["view"] });

  const data = await getAllKelasGpsOptions(user.desaId!);

  return HttpResponse(data.data);
});
