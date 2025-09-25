import { createPengajian } from "~~/server/repository/pengajian.repo";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["manage"] });

  const body = await readValidatedBody(event, (b) => ONamaTanggal.parse(b));

  await createPengajian(user.kelompokId!, body);

  return HttpResponse();
});
