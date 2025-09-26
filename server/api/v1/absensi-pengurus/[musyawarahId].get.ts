import { getAbsensiPengurusByMusyawarahId } from "~~/server/services/absensi-pengurus/absensi-pengurus.service";
import { getMusyawarahById } from "~~/server/repository/musyawarah.repo";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { sekretariat: ["view"] });
  const musyawarahId = Number(getRouterParam(event, "musyawarahId"));

  const check = await getMusyawarahById(musyawarahId);
  if (check.data?.daerahId !== user.daerahId) {
    throw createError({
      statusCode: 403,
      message: "Anda tidak punya akses ke daerah ini",
    });
  }

  const data = await getAbsensiPengurusByMusyawarahId(
    user.daerahId,
    musyawarahId
  );

  return HttpResponse(data.data);
});
