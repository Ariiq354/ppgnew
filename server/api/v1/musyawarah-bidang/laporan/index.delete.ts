import { OLaporanMusyawarahBidangDelete } from "~~/server/services/laporan-musyawarah-bidang/dto/laporan-musyawarah-bidang.dto";
import { deleteLaporanMusyawarahBidang } from "~~/server/services/laporan-musyawarah-bidang/laporan-musyawarah-bidang.service";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { sekretariat: ["manage"] });
  const body = await readValidatedBody(event, (b) =>
    OLaporanMusyawarahBidangDelete.parse(b)
  );

  if (user.role !== "admin" && user.role !== body.bidang) {
    throw createError({
      statusCode: 403,
      statusMessage: "Unauthorized",
    });
  }

  await deleteLaporanMusyawarahBidang(
    body.id,
    body.musyawarahId,
    user.daerahId,
    body.bidang
  );
  return HttpResponse();
});
