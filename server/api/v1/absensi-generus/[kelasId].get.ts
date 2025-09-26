import { getAbsensiGenerusByKelasId } from "~~/server/services/absensi-generus/absensi-generus.service";
import { getKelasById } from "~~/server/repository/kelas-kelompok.repo";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["view"] });
  const kelasId = Number(getRouterParam(event, "kelasId"));

  const check = await getKelasById(kelasId);
  if (check.data?.kelompokId !== user.kelompokId) {
    throw createError({
      statusCode: 403,
      message: "Anda tidak punya akses ke kelompok ini",
    });
  }

  const data = await getAbsensiGenerusByKelasId(user.kelompokId!, kelasId);

  return HttpResponse(data.data);
});
