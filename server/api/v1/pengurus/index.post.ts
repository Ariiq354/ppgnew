import { createPengurusWithUpload } from "~~/server/services/pengurus.service";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { sekretariat: ["manage"] });

  const result = await readMultipartFormData(event);

  await createPengurusWithUpload(user, result);

  return HttpResponse();
});
