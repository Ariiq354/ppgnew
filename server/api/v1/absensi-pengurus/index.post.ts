import {
  createAbsensiPengurus,
  deleteAbsensiPengurus,
  updateAbsensiPengurus,
} from "~~/server/services/absensi-pengurus/absensi-pengurus.service";
import { OAbsensiPengurusCreate } from "~~/server/services/absensi-pengurus/dto/absensi-pengurus.dto";
import { getMusyawarahById } from "~~/server/services/musyawarah/musyawarah.service";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { sekretariat: ["manage"] });

  const res = await readValidatedBody(event, (body) =>
    OAbsensiPengurusCreate.parse(body)
  );

  const check = await getMusyawarahById(res.musyawarahId);
  if (check.data?.daerahId !== user.daerahId) {
    throw createError({
      statusCode: 403,
      message: "Anda tidak punya akses ke daerah ini",
    });
  }

  for (const item of res.absen) {
    if (item.id) {
      if (item.keterangan === "Tanpa Keterangan") {
        await deleteAbsensiPengurus([item.id], user.daerahId, res.musyawarahId);
      } else {
        updateAbsensiPengurus(item.id, user.daerahId, res.musyawarahId, item);
      }
    } else {
      await createAbsensiPengurus(res.musyawarahId, user.daerahId, item);
    }
  }

  return HttpResponse();
});
