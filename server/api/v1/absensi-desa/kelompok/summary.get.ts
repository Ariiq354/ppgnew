import { OAbsensiKelasPengajianKelompokList } from "~~/server/services/absensi-generus/absensi-generus.dto";
import {
  getCountAbsensiGenerus,
  getCountGenerusAbsensi,
} from "~~/server/services/absensi-generus/absensi-generus.service";
import { getCountKelas } from "~~/server/services/kelas-kelompok/kelas-kelompok.service";
import { getKelompokByDesaId } from "~~/server/services/kelompok/kelompok.service";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_desa: ["view"] });

  const query = await getValidatedQuery(event, (q) =>
    OAbsensiKelasPengajianKelompokList.parse(q)
  );

  const desa = await getKelompokByDesaId(user.desaId!);
  if (!desa.find((i) => i.id === query.kelompokId)) {
    throw createError({
      statusCode: 403,
      message: "There is no kelompok in your deaa",
    });
  }

  const countGenerus = await getCountGenerusAbsensi(
    query.kelompokId,
    query.kelasPengajian
  );
  const countKelas = await getCountKelas(
    query.kelompokId,
    query.kelasPengajian
  );
  const countAbsensi = await getCountAbsensiGenerus(
    query.kelompokId,
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
