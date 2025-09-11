import { z } from "zod/mini";
import { OLaporanMusyawarahCreate } from "~~/server/services/laporan-musyawarah/dto/laporan-musyawarah.dto";
import { updateLaporanMusyawarah } from "~~/server/services/laporan-musyawarah/laporan-musyawarah.service";
import sanitizeHtml from "sanitize-html";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { sekretariat: ["manage"] });
  const id = getRouterParam(event, "id");
  const parsed = z.coerce.number().parse(id);

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

  await updateLaporanMusyawarah(parsed, user.daerahId, body);

  return HttpResponse();
});
