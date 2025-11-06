import { deleteKonselingService } from "~~/server/modules/konseling";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["manage"] });
  const body = await readValidatedBody(event, (b) => ODelete.parse(b));

  await deleteKonselingService(user.kelompokId!, body.id);

  return HttpResponse();
});
