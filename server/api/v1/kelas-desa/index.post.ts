import { createKelasDesa } from "~~/server/services/kelas-desa/kelas-desa.service";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_desa: ["manage"] });

  const body = await readValidatedBody(event, (b) => ONamaTanggal.parse(b));

  await createKelasDesa(user.desaId!, body);

  return HttpResponse();
});
