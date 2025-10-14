import {
  deleteLaporanMuslimunService,
  OLaporanMuslimunDelete,
} from "~~/server/modules/laporan-muslimun";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["manage"] });
  const body = await readValidatedBody(event, (b) =>
    OLaporanMuslimunDelete.parse(b)
  );

  await deleteLaporanMuslimunService(user.kelompokId!, body);

  return HttpResponse();
});
