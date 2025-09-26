import { deleteMuslimun } from "~~/server/repository/muslimun.repo";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["manage"] });
  const body = await readValidatedBody(event, (b) => ODelete.parse(b));

  await deleteMuslimun(user.kelompokId!, body.id);
  return HttpResponse();
});
