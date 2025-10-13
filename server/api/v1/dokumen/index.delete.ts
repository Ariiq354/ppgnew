import { deleteDokumenService } from "~~/server/modules/dokumen";

export default defineEventHandler(async (event) => {
  const user = adminGuard(event);
  const body = await readValidatedBody(event, (b) => ODelete.parse(b));

  await deleteDokumenService(user.daerahId, body.id);

  return HttpResponse();
});
