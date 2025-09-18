import {
  getCountAbsensiKeputrian,
  getCountKeputrianAbsensi,
} from "~~/server/services/absensi-keputrian/absensi-keputrian.service";
import { OAbsensiKelasPengajianList } from "~~/server/services/absensi-keputrian/dto/absensi-keputrian.dto";
import { getCountKelasKeputrian } from "~~/server/services/kelas-keputrian/kelas-keputrian.service";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { keputrian: ["view"] });

  const query = await getValidatedQuery(event, (q) =>
    OAbsensiKelasPengajianList.parse(q)
  );

  const countKeputrian = await getCountKeputrianAbsensi(
    user.daerahId,
    query.kelasPengajian
  );
  const countKelas = await getCountKelasKeputrian(
    user.daerahId,
    query.kelasPengajian
  );
  const countAbsensi = await getCountAbsensiKeputrian(
    user.daerahId,
    query.kelasPengajian
  );

  const denominator = countKeputrian * countKelas;
  const kehadiran =
    denominator > 0 ? Math.round((countAbsensi * 100) / denominator) : 0;

  const data = {
    countKeputrian,
    kehadiran,
  };

  return HttpResponse(data);
});
