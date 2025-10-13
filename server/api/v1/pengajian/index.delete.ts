import { deletePengajianService } from "~~/server/modules/pengajian";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["manage"] });
  const body = await readValidatedBody(event, (b) => ODelete.parse(b));

  await deletePengajianService(user.kelompokId!, body.id);
  return HttpResponse();
});
