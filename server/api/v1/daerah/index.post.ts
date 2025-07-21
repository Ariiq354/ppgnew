import { createDaerah } from "~~/server/services/daerah/daerah.service";
import { ODaerahCreate } from "~~/server/services/daerah/dto/daerah.dto";

export default defineEventHandler(async (event) => {
  authGuard(event);

  const body = await getValidatedQuery(event, (b) => ODaerahCreate.parse(b));

  await createDaerah(body);

  return HttpResponse();
});
