import { deletePengajian } from "~~/server/repository/pengajian.repo";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["manage"] });
  const body = await readValidatedBody(event, (b) => ODelete.parse(b));

  await deletePengajian(user.kelompokId!, body.id);
  return HttpResponse();
});
