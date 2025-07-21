import { createDesa } from "~~/server/services/desa/desa.service";
import { ODesaCreate } from "~~/server/services/desa/dto/desa.dto";

export default defineEventHandler(async (event) => {
  authGuard(event);

  const body = await getValidatedQuery(event, (b) => ODesaCreate.parse(b));

  await createDesa(body);

  return HttpResponse();
});
