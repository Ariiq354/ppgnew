import { getAbsensiJamaahByPengajianId } from "~~/server/services/absensi-jamaah/absensi-jamaah.service";
import { getPengajianById } from "~~/server/services/pengajian/pengajian.service";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["view"] });
  const pengajianId = Number(getRouterParam(event, "pengajianId"));

  const check = await getPengajianById(pengajianId);
  if (check.data?.kelompokId !== user.kelompokId) {
    throw createError({
      statusCode: 403,
      message: "Anda tidak punya akses ke kelompok ini",
    });
  }

  const data = await getAbsensiJamaahByPengajianId(
    user.kelompokId!,
    pengajianId
  );

  return HttpResponse(data.data);
});
