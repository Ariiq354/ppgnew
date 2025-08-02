import { z } from "zod/mini";
import { getOptionsKelompok } from "~~/server/services/kelompok/kelompok.service";

export default defineEventHandler(async (event) => {
  authGuard(event);

  const query = await getValidatedQuery(event, (q) =>
    z.object({ desaId: z.number() }).parse(q)
  );

  const data = await getOptionsKelompok(query.desaId);

  return HttpResponse(data.data);
});
