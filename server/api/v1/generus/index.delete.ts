import { deleteGenerusService } from "~~/server/services/generus.service";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["manage"] });
  const body = await readValidatedBody(event, (b) => ODelete.parse(b));

  await deleteGenerusService(user, body);
  return HttpResponse();
});
