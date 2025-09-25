import { deleteKelasDesa } from "~~/server/services/kelas-desa/kelas-desa.service";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_desa: ["manage"] });
  const body = await readValidatedBody(event, (b) => ODelete.parse(b));

  await deleteKelasDesa(user.desaId!, body.id);
  return HttpResponse();
});
