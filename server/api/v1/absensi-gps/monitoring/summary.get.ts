import {
  getCountAbsensiGenerusDesa,
  getCountGenerusDesaAbsensi,
} from "~~/server/services/absensi-desa/absensi-desa.service";
import { getCountKelasDesa } from "~~/server/services/kelas-desa/kelas-desa.service";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_desa: ["view"] });

  const query = await getValidatedQuery(event, (q) =>
    OAbsensiKelasPengajianList.parse(q)
  );

  const countGenerus = await getCountGenerusDesaAbsensi(
    user.desaId!,
    query.kelasPengajian
  );
  const countKelas = await getCountKelasDesa(
    user.desaId!,
    query.kelasPengajian
  );
  const countAbsensi = await getCountAbsensiGenerusDesa(
    user.desaId!,
    query.kelasPengajian
  );

  const denominator = countGenerus * countKelas;
  const kehadiran =
    denominator > 0 ? Math.round((countAbsensi * 100) / denominator) : 0;

  const data = {
    countGenerus,
    kehadiran,
  };

  return HttpResponse(data);
});
