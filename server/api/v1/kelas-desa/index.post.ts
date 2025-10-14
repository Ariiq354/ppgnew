import { createKelasDesaService } from "~~/server/modules/kelas-desa";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_desa: ["manage"] });

  const body = await readValidatedBody(event, (b) => ONamaTanggal.parse(b));

  await createKelasDesaService(user.desaId!, body);

  return HttpResponse();
});
