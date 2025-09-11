import { OLaporanMusyawarahCreate } from "~~/server/services/laporan-musyawarah/dto/laporan-musyawarah.dto";
import { createLaporanMusyawarah } from "~~/server/services/laporan-musyawarah/laporan-musyawarah.service";
import sanitizeHtml from "sanitize-html";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { musyawarah_ppg: ["manage"] });

  const body = await readValidatedBody(event, (b) =>
    OLaporanMusyawarahCreate.parse(b)
  );
  if (user.role !== "admin" && user.role !== body.bidang) {
    throw createError({
      statusCode: 403,
      statusMessage: "Unauthorized",
    });
  }

  body.keterangan = sanitizeHtml(body.keterangan);

  await createLaporanMusyawarah(user.daerahId, body);

  return HttpResponse();
});
