import { deleteKelompokService } from "~~/server/modules/kelompok";

export default defineEventHandler(async (event) => {
  adminGuard(event);
  const body = await readValidatedBody(event, (b) => ODelete.parse(b));

  await deleteKelompokService(body.id);
  return HttpResponse();
});
