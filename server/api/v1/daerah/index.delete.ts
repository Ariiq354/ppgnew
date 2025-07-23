import { deleteDaerah } from "~~/server/services/daerah/daerah.service";

export default defineEventHandler(async (event) => {
  permissionGuard(event, { daerah: ["delete"] });
  const body = await readValidatedBody(event, (b) => ODeleteSchema.parse(b));

  await deleteDaerah(body.id);
  return HttpResponse();
});
