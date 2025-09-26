import { getAllKelasGpsOptions } from "~~/server/repository/kelas-gps.repo";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_desa: ["view"] });

  const data = await getAllKelasGpsOptions(user.desaId!);

  return HttpResponse(data.data);
});
