import { deleteMuslimunService } from "~~/server/modules/muslimun";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["manage"] });
  const body = await readValidatedBody(event, (b) => ODelete.parse(b));

  await deleteMuslimunService(user.kelompokId!, body.id);
  return HttpResponse();
});
