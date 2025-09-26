import { updateKelasGps } from "~~/server/repository/kelas-gps.repo";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_desa: ["manage"] });
  const id = OParam.parse(getRouterParam(event, "id"));

  const body = await readValidatedBody(event, (b) => ONamaTanggal.parse(b));

  await updateKelasGps(id, user.desaId!, body);

  return HttpResponse();
});
