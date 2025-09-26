import { getAbsensiGenerusDesaByKelasId } from "~~/server/services/absensi-desa/absensi-desa.service";
import { getKelasDesaById } from "~~/server/repository/kelas-desa.repo";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_desa: ["view"] });
  const kelasId = Number(getRouterParam(event, "kelasId"));

  const check = await getKelasDesaById(kelasId);
  if (check.data?.desaId !== user.desaId) {
    throw createError({
      statusCode: 403,
      message: "Anda tidak punya akses ke desa ini",
    });
  }

  const data = await getAbsensiGenerusDesaByKelasId(user.desaId!, kelasId);

  return HttpResponse(data.data);
});
