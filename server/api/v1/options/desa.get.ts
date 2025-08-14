import { z } from "zod/mini";
import { getOptionsDesa } from "~~/server/services/desa/desa.service";

export default defineEventHandler(async (event) => {
  authGuard(event);

  const query = await getValidatedQuery(event, (q) =>
    z.object({ daerahId: z.optional(z.coerce.number()) }).parse(q)
  );

  if (!query.daerahId) {
    return HttpResponse([]);
  }

  const data = await getOptionsDesa(query.daerahId);

  return HttpResponse(data.data);
});
