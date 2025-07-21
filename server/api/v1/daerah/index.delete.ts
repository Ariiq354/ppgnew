import { deleteDaerah } from "~~/server/services/daerah/daerah.service";

export default defineEventHandler(async (event) => {
  adminGuard(event);
  const body = await readValidatedBody(event, (b) => ODeleteSchema.parse(b));

  await deleteDaerah(body.id);
  return HttpResponse();
});
