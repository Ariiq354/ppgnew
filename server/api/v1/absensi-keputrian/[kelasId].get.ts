import { getAbsensiKeputrianByKelasId } from "~~/server/services/absensi-keputrian/absensi-keputrian.service";
import { getKelasKeputrianById } from "~~/server/services/kelas-keputrian/kelas-keputrian.service";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { keputrian: ["view"] });
  const kelasId = Number(getRouterParam(event, "kelasId"));

  const check = await getKelasKeputrianById(kelasId);
  if (check.data?.daerahId !== user.daerahId) {
    throw createError({
      statusCode: 403,
      message: "Anda tidak punya akses ke daerah ini",
    });
  }

  const data = await getAbsensiKeputrianByKelasId(user.daerahId, kelasId);

  return HttpResponse(data.data);
});
