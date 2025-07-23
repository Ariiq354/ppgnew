import { z } from "zod/mini";
import { updateDesa } from "~~/server/services/desa/desa.service";
import { ODesaCreate } from "~~/server/services/desa/dto/desa.dto";

const paramsSchema = z.coerce.number();

export default defineEventHandler(async (event) => {
  permissionGuard(event, { desa: ["update"] });
  const result = await readValidatedBody(event, (b) => ODesaCreate.parse(b));
  const id = paramsSchema.parse(getRouterParam(event, "id"));

  await updateDesa(id, result);

  return HttpResponse();
});
