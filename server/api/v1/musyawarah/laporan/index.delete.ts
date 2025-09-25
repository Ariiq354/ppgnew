import { OLaporanMusyawarahDelete } from "~~/server/services/laporan-musyawarah/laporan-musyawarah.dto";
import { deleteLaporanMusyawarah } from "~~/server/services/laporan-musyawarah/laporan-musyawarah.service";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { sekretariat: ["manage"] });
  const body = await readValidatedBody(event, (b) =>
    OLaporanMusyawarahDelete.parse(b)
  );

  if (user.role !== "admin" && user.role !== body.bidang) {
    throw createError({
      statusCode: 403,
      statusMessage: "Unauthorized",
    });
  }

  await deleteLaporanMusyawarah(
    body.id,
    body.musyawarahId,
    user.daerahId,
    body.bidang
  );
  return HttpResponse();
});
