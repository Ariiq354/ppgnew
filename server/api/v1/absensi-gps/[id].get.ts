import { getAbsensiGpsByKelasIdService } from "~~/server/modules/absensi-gps";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_desa: ["view"] });
  const id = OParam.parse(getRouterParam(event, "id"));

  const data = await getAbsensiGpsByKelasIdService(user.desaId!, id);

  return HttpResponse(data);
});
