import {
  createAbsensiGps,
  deleteAbsensiGps,
  updateAbsensiGps,
} from "~~/server/services/absensi-gps/absensi-gps.service";
import { getKelasGpsById } from "~~/server/services/kelas-gps/kelas-gps.service";
import { OAbsensiGenerusCreate } from "~~/server/utils/dto";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_desa: ["manage"] });

  const res = await readValidatedBody(event, (body) =>
    OAbsensiGenerusCreate.parse(body)
  );

  const check = await getKelasGpsById(res.kelasId);
  if (check.data?.desaId !== user.desaId) {
    throw createError({
      statusCode: 403,
      message: "Anda tidak punya akses ke desa ini",
    });
  }

  for (const item of res.absen) {
    if (item.id) {
      if (item.keterangan === "Tanpa Keterangan") {
        await deleteAbsensiGps([item.id], res.kelasId);
      } else {
        updateAbsensiGps(item.id, res.kelasId, user.desaId!, item);
      }
    } else {
      await createAbsensiGps(res.kelasId, user.desaId!, item);
    }
  }

  return HttpResponse();
});
