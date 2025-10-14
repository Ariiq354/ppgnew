import { deleteKelasDesaService } from "~~/server/modules/kelas-desa";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_desa: ["manage"] });
  const body = await readValidatedBody(event, (b) => ODelete.parse(b));

  await deleteKelasDesaService(user.desaId!, body.id);
  return HttpResponse();
});
