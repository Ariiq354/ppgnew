import { getAbsensiGpsByKelasId } from "~~/server/services/absensi-gps/absensi-gps.service";
import { getKelasGpsById } from "~~/server/services/kelas-gps/kelas-gps.service";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_desa: ["view"] });
  const kelasId = Number(getRouterParam(event, "kelasId"));

  const check = await getKelasGpsById(kelasId);
  if (check.data?.desaId !== user.desaId) {
    throw createError({
      statusCode: 403,
      message: "Anda tidak punya akses ke desa ini",
    });
  }

  const data = await getAbsensiGpsByKelasId(user.desaId!, kelasId);

  return HttpResponse(data.data);
});
