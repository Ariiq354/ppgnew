import { getAbsensiGenerusByKelasIdService } from "~~/server/modules/absensi-generus";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["view"] });
  const id = OParam.parse(getRouterParam(event, "id"));

  const data = await getAbsensiGenerusByKelasIdService(user.kelompokId!, id);

  return HttpResponse(data);
});
