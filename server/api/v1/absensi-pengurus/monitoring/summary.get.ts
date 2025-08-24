import { getCountAbsensi } from "~~/server/services/absensi-pengurus/absensi-pengurus.service";
import { getCountMusyawarah } from "~~/server/services/musyawarah/musyawarah.service";
import { getCountPengurus } from "~~/server/services/pengurus/pengurus.service";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { sekretariat: ["view"] });

  const countPengurus = await getCountPengurus(user.daerahId);
  const countMusyawarah = await getCountMusyawarah(user.daerahId);
  const countAbsensi = await getCountAbsensi(user.daerahId);

  const denominator = countPengurus * countMusyawarah;
  const kehadiran =
    denominator > 0 ? Math.round((countAbsensi * 100) / denominator) : 0;

  const data = {
    countPengurus,
    kehadiran,
  };

  return HttpResponse(data);
});
