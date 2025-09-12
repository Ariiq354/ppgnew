import sanitizeHtml from "sanitize-html";
import { OLaporanMusyawarahBidangCreate } from "~~/server/services/laporan-musyawarah-bidang/dto/laporan-musyawarah-bidang.dto";
import { createLaporanMusyawarahBidang } from "~~/server/services/laporan-musyawarah-bidang/laporan-musyawarah-bidang.service";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { musyawarah_ppg: ["manage"] });

  const body = await readValidatedBody(event, (b) =>
    OLaporanMusyawarahBidangCreate.parse(b)
  );
  if (user.role !== "admin" && user.role !== body.bidang) {
    throw createError({
      statusCode: 403,
      statusMessage: "Unauthorized",
    });
  }

  body.keterangan = sanitizeHtml(body.keterangan);

  await createLaporanMusyawarahBidang(user.daerahId, body);

  return HttpResponse();
});
