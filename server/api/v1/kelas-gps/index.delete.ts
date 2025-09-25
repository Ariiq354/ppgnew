import { deleteKelasGps } from "~~/server/services/kelas-gps/kelas-gps.service";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_desa: ["manage"] });
  const body = await readValidatedBody(event, (b) => ODelete.parse(b));

  await deleteKelasGps(user.desaId!, body.id);
  return HttpResponse();
});
