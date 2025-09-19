import { getCountAbsensiJamaah } from "~~/server/services/absensi-jamaah/absensi-jamaah.service";
import { getCountPengajian } from "~~/server/services/pengajian/pengajian.service";
import { getCountJamaah } from "~~/server/services/jamaah/jamaah.service";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["view"] });

  const countJamaah = await getCountJamaah(user.kelompokId!);
  const countPengajian = await getCountPengajian(user.kelompokId!);
  const countAbsensi = await getCountAbsensiJamaah(user.kelompokId!);

  const denominator = countJamaah * countPengajian;
  const kehadiran =
    denominator > 0 ? Math.round((countAbsensi * 100) / denominator) : 0;

  const data = {
    countJamaah,
    kehadiran,
  };

  return HttpResponse(data);
});
