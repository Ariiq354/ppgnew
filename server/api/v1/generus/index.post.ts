import { createGenerusWithUpload } from "~~/server/services/generus.service";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["manage"] });

  const result = await readMultipartFormData(event);

  await createGenerusWithUpload(user, result);

  return HttpResponse();
});
