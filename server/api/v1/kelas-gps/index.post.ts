import { createKelasGps } from "~~/server/services/kelas-gps/kelas-gps.service";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_desa: ["manage"] });

  const body = await readValidatedBody(event, (b) => ONamaTanggal.parse(b));

  await createKelasGps(user.desaId!, body);

  return HttpResponse();
});
