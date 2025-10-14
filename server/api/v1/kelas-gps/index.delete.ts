import { deleteKelasGpsService } from "~~/server/modules/kelas-gps";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_desa: ["manage"] });
  const body = await readValidatedBody(event, (b) => ODelete.parse(b));

  await deleteKelasGpsService(user.desaId!, body.id);
  return HttpResponse();
});
