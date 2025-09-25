import { deleteDaerah } from "~~/server/repository/daerah.repo";

export default defineEventHandler(async (event) => {
  permissionGuard(event, { daerah: ["manage"] });
  const body = await readValidatedBody(event, (b) => ODelete.parse(b));

  await deleteDaerah(body.id);
  return HttpResponse();
});
