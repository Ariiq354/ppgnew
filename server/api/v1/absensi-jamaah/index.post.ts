import {
  createAbsensiJamaah,
  deleteAbsensiJamaah,
  updateAbsensiJamaah,
} from "~~/server/services/absensi-jamaah/absensi-jamaah.service";
import { OAbsensiJamaahCreate } from "~~/server/services/absensi-jamaah/absensi-jamaah.dto";
import { getPengajianById } from "~~/server/services/pengajian/pengajian.service";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["manage"] });

  const res = await readValidatedBody(event, (body) =>
    OAbsensiJamaahCreate.parse(body)
  );

  const check = await getPengajianById(res.pengajianId);
  if (check.data?.kelompokId !== user.kelompokId) {
    throw createError({
      statusCode: 403,
      message: "Anda tidak punya akses ke kelompok ini",
    });
  }

  for (const item of res.absen) {
    if (item.id) {
      if (item.keterangan === "Tanpa Keterangan") {
        await deleteAbsensiJamaah([item.id], res.pengajianId);
      } else {
        updateAbsensiJamaah(item.id, res.pengajianId, user.kelompokId!, item);
      }
    } else {
      await createAbsensiJamaah(res.pengajianId, user.kelompokId!, item);
    }
  }

  return HttpResponse();
});
