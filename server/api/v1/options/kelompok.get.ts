import { z } from "zod/mini";
import { getOptionsKelompok } from "~~/server/repository/kelompok.repo";

export default defineEventHandler(async (event) => {
  authGuard(event);

  const query = await getValidatedQuery(event, (q) =>
    z.object({ desaId: z.optional(z.coerce.number()) }).parse(q)
  );

  if (!query.desaId) {
    return HttpResponse([]);
  }

  const data = await getOptionsKelompok(query.desaId);

  return HttpResponse(data);
});
