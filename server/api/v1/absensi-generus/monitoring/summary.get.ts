import {
  getCountAbsensi,
  getCountGenerusAbsensi,
} from "~~/server/services/absensi-generus/absensi-generus.service";
import { OAbsensiKelasPengajianList } from "~~/server/services/absensi-generus/dto/absensi-generus.dto";
import { getCountKelas } from "~~/server/services/kelas-kelompok/kelas-kelompok.service";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["view"] });

  const query = await getValidatedQuery(event, (q) =>
    OAbsensiKelasPengajianList.parse(q)
  );

  const countGenerus = await getCountGenerusAbsensi(
    user.kelompokId!,
    query.kelasPengajian
  );
  const countKelas = await getCountKelas(
    user.kelompokId!,
    query.kelasPengajian
  );
  const countAbsensi = await getCountAbsensi(
    user.kelompokId!,
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
