import { deletePengajarService } from "~~/server/modules/pengajar";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["manage"] });
  const body = await readValidatedBody(event, (b) => ODelete.parse(b));

  await deletePengajarService(user, body);
  return HttpResponse();
});
