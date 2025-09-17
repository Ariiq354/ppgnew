import { deletePengajian } from "~~/server/services/pengajian/pengajian.service";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["manage"] });
  const body = await readValidatedBody(event, (b) => ODeleteSchema.parse(b));

  await deletePengajian(user.kelompokId!, body.id);
  return HttpResponse();
});
