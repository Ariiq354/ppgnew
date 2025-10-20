import { getAbsensiJamaahByPengajianIdService } from "~~/server/modules/absensi-jamaah";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["view"] });
  const id = OParam.parse(getRouterParam(event, "id"));

  const data = await getAbsensiJamaahByPengajianIdService(user.kelompokId!, id);

  return HttpResponse(data.data);
});
