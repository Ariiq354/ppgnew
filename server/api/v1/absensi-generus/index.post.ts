import {
  createAbsensiGenerus,
  deleteAbsensiGenerus,
  updateAbsensiGenerus,
} from "~~/server/services/absensi-generus/absensi-generus.service";
import { getKelasById } from "~~/server/services/kelas-kelompok/kelas-kelompok.service";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["manage"] });

  const res = await readValidatedBody(event, (body) =>
    OAbsensiGenerusCreate.parse(body)
  );

  const check = await getKelasById(res.kelasId);
  if (check.data?.kelompokId !== user.kelompokId) {
    throw createError({
      statusCode: 403,
      message: "Anda tidak punya akses ke kelompok ini",
    });
  }

  for (const item of res.absen) {
    if (item.id) {
      if (item.keterangan === "Tanpa Keterangan") {
        await deleteAbsensiGenerus([item.id], res.kelasId);
      } else {
        updateAbsensiGenerus(
          item.id,
          res.kelasId,
          user.kelompokId!,
          check.data!.nama,
          item
        );
      }
    } else {
      await createAbsensiGenerus(
        res.kelasId,
        user.kelompokId!,
        check.data!.nama,
        item
      );
    }
  }

  return HttpResponse();
});
