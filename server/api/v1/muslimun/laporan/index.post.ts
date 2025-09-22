import sanitizeHtml from "sanitize-html";
import { OLaporanMuslimunCreate } from "~~/server/services/laporan-muslimun/dto/laporan-muslimun.dto";
import { createLaporanMuslimun } from "~~/server/services/laporan-muslimun/laporan-muslimun.service";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["manage"] });

  const body = await readValidatedBody(event, (b) =>
    OLaporanMuslimunCreate.parse(b)
  );

  body.keterangan = sanitizeHtml(body.keterangan);

  await createLaporanMuslimun(user.kelompokId!, body);

  return HttpResponse();
});
