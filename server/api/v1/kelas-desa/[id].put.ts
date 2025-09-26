import { updateKelasDesa } from "~~/server/repository/kelas-desa.repo";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_desa: ["manage"] });
  const id = OParam.parse(getRouterParam(event, "id"));

  const body = await readValidatedBody(event, (b) => ONamaTanggal.parse(b));

  await updateKelasDesa(id, user.desaId!, body);

  return HttpResponse();
});
