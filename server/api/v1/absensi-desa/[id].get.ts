import { getAbsensiGenerusDesaByKelasIdService } from "~~/server/modules/absensi-desa";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_desa: ["view"] });
  const id = OParam.parse(getRouterParam(event, "id"));

  const data = await getAbsensiGenerusDesaByKelasIdService(user.desaId!, id);

  return HttpResponse(data);
});
