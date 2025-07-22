import { z } from "zod/mini";
import { updateDaerah } from "~~/server/services/daerah/daerah.service";
import { ODaerahCreate } from "~~/server/services/daerah/dto/daerah.dto";

const paramsSchema = z.coerce.number();

export default defineEventHandler(async (event) => {
  adminGuard(event);
  const result = await readValidatedBody(event, (b) => ODaerahCreate.parse(b));
  const id = paramsSchema.parse(getRouterParam(event, "id"));

  await updateDaerah(id, result);

  return HttpResponse();
});
