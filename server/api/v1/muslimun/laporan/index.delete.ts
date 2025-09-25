import { OLaporanMuslimunDelete } from "~~/server/services/laporan-muslimun/laporan-muslimun.dto";
import { deleteLaporanMuslimun } from "~~/server/services/laporan-muslimun/laporan-muslimun.service";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["manage"] });
  const body = await readValidatedBody(event, (b) =>
    OLaporanMuslimunDelete.parse(b)
  );

  await deleteLaporanMuslimun(body.id, body.musyawarahId, user.kelompokId!);
  return HttpResponse();
});
