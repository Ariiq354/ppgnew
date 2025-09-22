import {
  createAbsensiGenerusDesa,
  deleteAbsensiGenerusDesa,
  updateAbsensiGenerusDesa,
} from "~~/server/services/absensi-desa/absensi-desa.service";
import { getKelasDesaById } from "~~/server/services/kelas-desa/kelas-desa.service";
import { OAbsensiGenerusCreate } from "~~/server/utils/dto";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_desa: ["manage"] });

  const res = await readValidatedBody(event, (body) =>
    OAbsensiGenerusCreate.parse(body)
  );

  const check = await getKelasDesaById(res.kelasId);
  if (check.data?.desaId !== user.desaId) {
    throw createError({
      statusCode: 403,
      message: "Anda tidak punya akses ke desa ini",
    });
  }

  for (const item of res.absen) {
    if (item.id) {
      if (item.keterangan === "Tanpa Keterangan") {
        await deleteAbsensiGenerusDesa([item.id], res.kelasId);
      } else {
        updateAbsensiGenerusDesa(
          item.id,
          res.kelasId,
          user.desaId!,
          check.data!.nama,
          item
        );
      }
    } else {
      await createAbsensiGenerusDesa(
        res.kelasId,
        user.desaId!,
        check.data!.nama,
        item
      );
    }
  }

  return HttpResponse();
});
