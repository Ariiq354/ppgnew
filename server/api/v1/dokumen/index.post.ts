import { createDokumenService } from "~~/server/modules/dokumen";

export default defineEventHandler(async (event) => {
  const user = authGuard(event);

  const result = await readMultipartFormData(event);

  await createDokumenService(user.daerahId, result);

  return HttpResponse();
});
