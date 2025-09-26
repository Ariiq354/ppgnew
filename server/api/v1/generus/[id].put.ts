import { z } from "zod/mini";
import { updateGenerusWithUpload } from "~~/server/services/generus.service";

const paramsSchema = z.coerce.number();

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["manage"] });

  const result = await readMultipartFormData(event);
  const id = paramsSchema.parse(getRouterParam(event, "id"));

  await updateGenerusWithUpload(id, user, result);

  return HttpResponse();
});
