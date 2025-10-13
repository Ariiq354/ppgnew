import { deleteDesaService } from "~~/server/modules/desa";

export default defineEventHandler(async (event) => {
  adminGuard(event);
  const body = await readValidatedBody(event, (b) => ODelete.parse(b));

  await deleteDesaService(body.id);
  return HttpResponse();
});
