import { createPengurusService } from "~~/server/modules/pengurus";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { sekretariat: ["manage"] });

  const result = await readMultipartFormData(event);

  await createPengurusService(user, result);

  return HttpResponse();
});
