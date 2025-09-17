import { deleteJamaah } from "~~/server/services/jamaah/jamaah.service";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["manage"] });
  const body = await readValidatedBody(event, (b) => ODeleteSchema.parse(b));

  await deleteJamaah(user.kelompokId!, body.id);
  return HttpResponse();
});
