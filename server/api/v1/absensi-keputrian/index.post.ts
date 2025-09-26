import {
  createAbsensiKeputrian,
  deleteAbsensiKeputrian,
  updateAbsensiKeputrian,
} from "~~/server/services/absensi-keputrian/absensi-keputrian.service";
import { getKelasKeputrianById } from "~~/server/repository/kelas-keputrian.repo";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { keputrian: ["manage"] });

  const res = await readValidatedBody(event, (body) =>
    OAbsensiGenerusCreate.parse(body)
  );

  const check = await getKelasKeputrianById(res.kelasId);
  if (check.data?.daerahId !== user.daerahId) {
    throw createError({
      statusCode: 403,
      message: "Anda tidak punya akses ke daerah ini",
    });
  }

  for (const item of res.absen) {
    if (item.id) {
      if (item.keterangan === "Tanpa Keterangan") {
        await deleteAbsensiKeputrian([item.id], res.kelasId);
      } else {
        updateAbsensiKeputrian(
          item.id,
          res.kelasId,
          user.daerahId,
          check.data!.nama,
          item
        );
      }
    } else {
      await createAbsensiKeputrian(
        res.kelasId,
        user.daerahId,
        check.data!.nama,
        item
      );
    }
  }

  return HttpResponse();
});
