import { deleteJamaahService } from "~~/server/modules/jamaah";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["manage"] });
  const body = await readValidatedBody(event, (b) => ODelete.parse(b));

  await deleteJamaahService(user.kelompokId!, body.id);
  return HttpResponse();
});
