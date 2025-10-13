import { deleteDaerahService } from "~~/server/modules/daerah";

export default defineEventHandler(async (event) => {
  adminGuard(event);

  const body = await readValidatedBody(event, (b) => ODelete.parse(b));

  await deleteDaerahService(body.id);

  return HttpResponse();
});
