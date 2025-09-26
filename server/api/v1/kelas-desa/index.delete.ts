import { deleteKelasDesa } from "~~/server/repository/kelas-desa.repo";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_desa: ["manage"] });
  const body = await readValidatedBody(event, (b) => ODelete.parse(b));

  await deleteKelasDesa(user.desaId!, body.id);
  return HttpResponse();
});
