import { createGenerusService } from "~~/server/modules/generus";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["manage"] });

  const result = await readMultipartFormData(event);


  await createGenerusService(user, result);

  return HttpResponse();
});
