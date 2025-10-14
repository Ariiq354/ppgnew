import { createKelasGpsService } from "~~/server/modules/kelas-gps";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_desa: ["manage"] });

  const body = await readValidatedBody(event, (b) => ONamaTanggal.parse(b));

  await createKelasGpsService(user.desaId!, body);

  return HttpResponse();
});
